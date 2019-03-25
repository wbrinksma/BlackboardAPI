import { BBNativeBackend, IframeAppLoader } from 'blackboardlib';

window.onload = () => {
    const ifmw = new IframeAppLoader(document, new BBNativeBackend());
    ifmw.loadApp(__ClientURL__);
};