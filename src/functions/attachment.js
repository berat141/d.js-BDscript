const Discord = require("discord.js")

module.exports = {
    name: "$attachment",
    brackets: true,
    description: "add a attachment to the response.",
    fields: [{
        name: "url",
        type: "string",
        description: "the url for this attachment"
    }, {
        name: "name",
        description: "the name for this attachment",
        type: "string"
    }],
    execute: async d => {
        const [
            url,
            name
        ] = (await d.resolveArray()) || []
        
        if (url === undefined) return undefined
        
        d.container.embed.attachFiles(new Discord.MessageAttachment(url, name))
        
        return d.deflate() 
    }
}