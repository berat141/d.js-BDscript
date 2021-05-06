module.exports = {
    name: "$removeReaction",
    description: "removes a user's emoji reaction of a message",
    brackets: true,
    fields: [{
        name: "channelID",
        description: "the channel where the message was sent in",
        type: "string"
    }, {
        name: "messageID",
        description: "the message to remove the user reaction from",
        type: "string"
    }, {
        name: "userID",
        description: "the user to remove their reaction",
        type: "string"
    }, {
        name: "emoji",
        type: "string",
        description: "the emoji to delete the reactions of"
    }],
    execute: async d => {
        const [
            channelID,
            messageID,
            userID, 
            emoji 
        ] = (await d.resolveArray()) || []
        
        if (channelID === undefined) return  
        const channel = d.client.channels.cache.get(channelID)
        
        if (!channel) return d.sendError("channelID", channelID)
        
        const msg = await channel.messages.fetch(messageID).catch(err => null) 
        
        if (!msg) return d.sendError("messageID", messageID)
        
        const r = await msg.reactions.cache.find(e => e.emoji.toString() === emoji)?.users.remove(userID).catch(err => null)
        
        if (!r) return d.sendError(`:x: Failed to delete user reaction!`)
        
        return d.deflate()
    }
}