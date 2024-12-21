import { useEffect } from 'react';

function Chatbot() {
    useEffect(() => {
        (function (w, d, s, ...args) {
            var div = d.createElement('div');
            div.id = 'aichatbot';
            d.body.appendChild(div);
            w.chatbotConfig = args;
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s);
            j.defer = true;
            j.type = 'module';
            j.src = 'https://aichatbot.sendbird.com/index.js';
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', '4CA76C1D-F6D0-4201-BF40-4BE613769E5A', 'jz0fDbw0IThHuaBe_50ae', {
            apiHost: 'https://api-cf-ap-5.sendbird.com',
        });
    }, []);

    return <div id="aichatbot-container"></div>;
}

export default Chatbot;
