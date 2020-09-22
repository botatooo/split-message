const { messages, channels } = require("powercord/webpack");
const { Plugin } = require("powercord/entities");

module.exports = class SplitMessage extends Plugin {
  async startPlugin() {
    console.log("hi fren");
    powercord.api.commands.registerCommand({
      command: "split",
      aliases: ["split-message", "split-msg", "splitmessage", "splitmsg"],
      description: "Send a message, one letter at a time.",
      usage: "{c} [message]",
      executor: async (args) => {
        return {
          send: false,
          result: args
            .join(" ")
            .replace(" ", "​")
            .split("")
            .forEach((e) => {
              messages.sendMessage(channels.getChannelId(), { content: e });
            }),
        };
      },
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("split");
  }
};
