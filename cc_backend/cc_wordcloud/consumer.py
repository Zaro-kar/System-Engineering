"""
WebSocket consumer for handling word updates.
"""

import json
from channels.generic.websocket import AsyncWebsocketConsumer # pylint: disable=E0401

class WordsUpdateConsumer(AsyncWebsocketConsumer):
    """
    Consumer to handle websocket connections for word updates.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.session = None
        self.group_name = None

    async def connect(self):
        """
        Handle websocket connection.
        """
        self.session = self.scope["url_route"]["kwargs"].get("session_id")
        print(self.session)
        if not self.session:
            await self.close()
        else:
            self.group_name = f"session_{self.session}"
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()

    async def disconnect(self, close_code): # pylint: disable=W0237
        """
        Handle websocket disconnection.
        """
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        # Unused argument 'close_code'
        _ = close_code

    async def words_update(self, event):
        """
        Send new words update to the client.
        """
        await self.send(text_data=json.dumps({
            "type": "new_words",
            "session": event["session"],
        }))

    async def session_closed(self, event):
        """
        Notify client that the session is closed.
        """
        await self.send(text_data=json.dumps({
            "type": "session_closed",
            "session": event["session"],
        }))
        await self.close()
