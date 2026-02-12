import * as ngrok from "@ngrok/ngrok";

(async function () {
    const listener = await ngrok.forward({
        addr: 4321,
        authtoken_from_env: true,
    });
    console.log(`Ingress established at: ${listener.url()}`);
})();
