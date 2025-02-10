import json
from channels.generic.websocket import AsyncWebsocketConsumer

class WordsUpdateConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.session = self.scope["url_route"]["kwargs"].get("session_id")
        print(self.session)
        if not self.session:
            await self.close()
        else:
            self.group_name = f"session_{self.session}"
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def words_update(self, event):
        await self.send(text_data=json.dumps({
            "type": "new_words",
            "session": event["session"],
        }))

    async def session_closed(self, event):
        await self.send(text_data=json.dumps({
            "type": "session_closed",
            "session": event["session"],
        }))
        await self.close()