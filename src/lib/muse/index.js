var node_path = './mac/MuseClientSdk.node';
const MuseSdk = require(node_path);

modules.export = () => {
    console.log({ MuseSdk });

    var result = MuseSdk.initialize();
    console.log('initialize:', result);
    const handle = result.handle;
    console.log('Handle', handle);
    var userInfo = MuseSdk.getUserInfo();
    console.log('UserInfo', userInfo);
}