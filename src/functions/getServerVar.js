module.exports = {
    name: "$getServerVar",
    brackets: true,
    execute: async d => {
        const [
            variable,
            guildID = d.message?.guild?.id
        ] = (await d.resolveArray()) || []
        
        if (variable === undefined) return undefined
        
        const data = await d.client.bot.db.get("main", guildID)
        
        const val = data[variable]
        
        if (val === undefined) return d.sendError(`:x: Variable '${variable}' does not exist!`)
        
        return d.deflate(val) 
    }
}