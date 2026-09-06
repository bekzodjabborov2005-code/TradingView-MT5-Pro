"""MT5 Broker Client - MetaQuotes API Integration"""

import MetaTrader5 as mt5
from typing import Optional, List, Dict, Tuple
from dataclasses import dataclass
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


@dataclass
class Position:
    """Position data model"""
    ticket: int
    symbol: str
    type: str  # "buy" or "sell"
    volume: float
    entry_price: float
    current_price: float
    profit_loss: float
    stop_loss: Optional[float]
    take_profit: Optional[float]
    open_time: datetime
    comment: str


@dataclass
class Order:
    """Order data model"""
    ticket: int
    symbol: str
    type: str
    volume: float
    price: float
    status: str
    create_time: datetime


class MT5Client:
    """MetaQuotes MT5 API Client"""
    
    def __init__(self, login: str, password: str, server: str):
        """
        Initialize MT5 connection
        
        Args:
            login: MT5 account login
            password: MT5 account password
            server: MT5 server name (e.g., "MetaQuotes-Demo")
        """
        self.login = login
        self.password = password
        self.server = server
        self.connected = False
    
    def connect(self) -> bool:
        """Connect to MT5"""
        try:
            if not mt5.initialize():
                logger.error("MT5 initialization failed")
                return False
            
            authorized = mt5.login(self.login, self.password, self.server)
            if not authorized:
                logger.error(f"Login failed for {self.login}")
                return False
            
            self.connected = True
            logger.info(f"Connected to MT5: {self.server}")
            return True
        except Exception as e:
            logger.error(f"Connection error: {e}")
            return False
    
    def disconnect(self) -> None:
        """Disconnect from MT5"""
        if self.connected:
            mt5.shutdown()
            self.connected = False
            logger.info("Disconnected from MT5")
    
    def get_account_info(self) -> Optional[Dict]:
        """Get account information"""
        if not self.connected:
            return None
        
        try:
            info = mt5.account_info()
            if info is None:
                return None
            
            return {
                "login": info.login,
                "balance": info.balance,
                "equity": info.equity,
                "profit": info.profit,
                "free_margin": info.margin_free,
                "used_margin": info.margin,
                "margin_level": info.margin_level,
                "currency": info.currency,
                "server": info.server,
            }
        except Exception as e:
            logger.error(f"Error getting account info: {e}")
            return None
    
    def get_positions(self) -> List[Position]:
        """Get all open positions"""
        if not self.connected:
            return []
        
        try:
            positions = mt5.positions_get()
            if positions is None:
                return []
            
            result = []
            for pos in positions:
                # Get current price
                tick = mt5.symbol_info_tick(pos.symbol)
                current_price = tick.bid if pos.type == mt5.ORDER_TYPE_SELL else tick.ask
                
                # Calculate profit/loss
                if pos.type == mt5.ORDER_TYPE_BUY:
                    profit_loss = (current_price - pos.price_open) * pos.volume * 10
                else:
                    profit_loss = (pos.price_open - current_price) * pos.volume * 10
                
                result.append(Position(
                    ticket=pos.ticket,
                    symbol=pos.symbol,
                    type="buy" if pos.type == mt5.ORDER_TYPE_BUY else "sell",
                    volume=pos.volume,
                    entry_price=pos.price_open,
                    current_price=current_price,
                    profit_loss=profit_loss,
                    stop_loss=pos.sl,
                    take_profit=pos.tp,
                    open_time=datetime.fromtimestamp(pos.time),
                    comment=pos.comment,
                ))
            
            return result
        except Exception as e:
            logger.error(f"Error getting positions: {e}")
            return []
    
    def place_market_order(
        self,
        symbol: str,
        action: str,
        volume: float,
        stop_loss: Optional[float] = None,
        take_profit: Optional[float] = None,
        comment: str = "API Order",
    ) -> Optional[int]:
        """
        Place a market order
        
        Args:
            symbol: Trading pair (e.g., "EURUSD")
            action: "buy" or "sell"
            volume: Lot size
            stop_loss: Stop loss level
            take_profit: Take profit level
            comment: Order comment
        
        Returns:
            Order ticket or None if failed
        """
        if not self.connected:
            logger.error("Not connected to MT5")
            return None
        
        try:
            # Get current price
            tick = mt5.symbol_info_tick(symbol)
            if tick is None:
                logger.error(f"Cannot get tick for {symbol}")
                return None
            
            # Determine order type and price
            if action.lower() == "buy":
                order_type = mt5.ORDER_TYPE_BUY
                price = tick.ask
            else:
                order_type = mt5.ORDER_TYPE_SELL
                price = tick.bid
            
            # Create order request
            request = {
                "action": mt5.TRADE_ACTION_DEAL,
                "symbol": symbol,
                "volume": volume,
                "type": order_type,
                "price": price,
                "sl": stop_loss,
                "tp": take_profit,
                "comment": comment,
                "type_filling": mt5.ORDER_FILLING_IOC,
            }
            
            # Send order
            result = mt5.order_send(request)
            
            if result.retcode != mt5.TRADE_RETCODE_DONE:
                logger.error(f"Order failed: {result.comment}")
                return None
            
            logger.info(f"Order placed: {result.order}")
            return result.order
        
        except Exception as e:
            logger.error(f"Error placing order: {e}")
            return None
    
    def place_limit_order(
        self,
        symbol: str,
        action: str,
        volume: float,
        price: float,
        stop_loss: Optional[float] = None,
        take_profit: Optional[float] = None,
    ) -> Optional[int]:
        """Place a limit order"""
        if not self.connected:
            return None
        
        try:
            order_type = mt5.ORDER_TYPE_BUY_LIMIT if action.lower() == "buy" else mt5.ORDER_TYPE_SELL_LIMIT
            
            request = {
                "action": mt5.TRADE_ACTION_PENDING,
                "symbol": symbol,
                "volume": volume,
                "type": order_type,
                "price": price,
                "sl": stop_loss,
                "tp": take_profit,
                "type_filling": mt5.ORDER_FILLING_IOC,
            }
            
            result = mt5.order_send(request)
            
            if result.retcode != mt5.TRADE_RETCODE_DONE:
                logger.error(f"Limit order failed: {result.comment}")
                return None
            
            return result.order
        except Exception as e:
            logger.error(f"Error placing limit order: {e}")
            return None
    
    def close_position(self, ticket: int) -> bool:
        """Close a position by ticket"""
        if not self.connected:
            return False
        
        try:
            # Get position details
            position = mt5.positions_get(ticket=ticket)
            if position is None or len(position) == 0:
                logger.error(f"Position {ticket} not found")
                return False
            
            pos = position[0]
            tick = mt5.symbol_info_tick(pos.symbol)
            
            # Create close order
            close_type = mt5.ORDER_TYPE_SELL if pos.type == mt5.ORDER_TYPE_BUY else mt5.ORDER_TYPE_BUY
            close_price = tick.bid if pos.type == mt5.ORDER_TYPE_BUY else tick.ask
            
            request = {
                "action": mt5.TRADE_ACTION_DEAL,
                "symbol": pos.symbol,
                "volume": pos.volume,
                "type": close_type,
                "price": close_price,
                "position": ticket,
                "type_filling": mt5.ORDER_FILLING_IOC,
            }
            
            result = mt5.order_send(request)
            
            if result.retcode != mt5.TRADE_RETCODE_DONE:
                logger.error(f"Failed to close position: {result.comment}")
                return False
            
            logger.info(f"Position {ticket} closed")
            return True
        except Exception as e:
            logger.error(f"Error closing position: {e}")
            return False
    
    def modify_position(
        self,
        ticket: int,
        stop_loss: Optional[float] = None,
        take_profit: Optional[float] = None,
    ) -> bool:
        """Modify SL/TP for a position"""
        if not self.connected:
            return False
        
        try:
            request = {
                "action": mt5.TRADE_ACTION_SLTP,
                "position": ticket,
                "sl": stop_loss,
                "tp": take_profit,
            }
            
            result = mt5.order_send(request)
            
            if result.retcode != mt5.TRADE_RETCODE_DONE:
                logger.error(f"Failed to modify position: {result.comment}")
                return False
            
            logger.info(f"Position {ticket} modified")
            return True
        except Exception as e:
            logger.error(f"Error modifying position: {e}")
            return False
    
    def get_symbol_info(self, symbol: str) -> Optional[Dict]:
        """Get symbol information"""
        if not self.connected:
            return None
        
        try:
            info = mt5.symbol_info(symbol)
            if info is None:
                return None
            
            return {
                "symbol": info.name,
                "bid": info.bid,
                "ask": info.ask,
                "volume": info.volume,
                "time": datetime.fromtimestamp(info.time),
            }
        except Exception as e:
            logger.error(f"Error getting symbol info: {e}")
            return None
    
    def get_history(self, symbol: str, days: int = 1) -> List[Dict]:
        """Get trade history for symbol"""
        if not self.connected:
            return []
        
        try:
            deals = mt5.history_deals_get(symbol=symbol, group="*")
            if deals is None:
                return []
            
            result = []
            for deal in deals:
                result.append({
                    "ticket": deal.ticket,
                    "symbol": deal.symbol,
                    "type": "buy" if deal.type == mt5.DEAL_TYPE_BUY else "sell",
                    "volume": deal.volume,
                    "price": deal.price,
                    "profit": deal.profit,
                    "time": datetime.fromtimestamp(deal.time),
                })
            
            return result
        except Exception as e:
            logger.error(f"Error getting history: {e}")
            return []


# Usage example
if __name__ == "__main__":
    client = MT5Client(
        login=1234567,
        password="password",
        server="MetaQuotes-Demo"
    )
    
    if client.connect():
        # Get account info
        account = client.get_account_info()
        print(f"Balance: {account['balance']}")
        
        # Get positions
        positions = client.get_positions()
        for pos in positions:
            print(f"{pos.symbol}: {pos.volume} lots, P/L: {pos.profit_loss}")
        
        # Place order
        ticket = client.place_market_order(
            symbol="EURUSD",
            action="buy",
            volume=0.1,
            stop_loss=1.1650,
            take_profit=1.1850,
        )
        
        client.disconnect()
