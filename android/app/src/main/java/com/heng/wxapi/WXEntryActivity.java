package com.heng.wxapi;    //改为你的包名   package com.xxx.wxapi;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.heng.wechat.WeChatModule;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.modelmsg.SendAuth;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;

public class WXEntryActivity extends Activity implements IWXAPIEventHandler {

    Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        context = this;
        WeChatModule.wxApi.handleIntent(getIntent(), this);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        WeChatModule.wxApi.handleIntent(intent, this);
    }

    @Override
    public void onReq(BaseReq baseReq) {

    }

    @Override
    public void onResp(BaseResp baseResp) {
        int errCode = baseResp.errCode;
        WritableMap params = Arguments.createMap();
        WritableMap map = Arguments.createMap();
        if (WeChatModule.currentAction.equals(WeChatModule.ACTION_LOGIN)) {
            map.putInt("errCode", errCode);
            switch (errCode) {
                case BaseResp.ErrCode.ERR_OK:
                    //用户同意
                    String code = ((SendAuth.Resp) baseResp).code;
                    String state = ((SendAuth.Resp) baseResp).state;
                    map.putString("code", code);                 // @A2
                    map.putString("state", state);               // @A3
                    map.putBoolean("success", true);             // @A1
                    break;
                case BaseResp.ErrCode.ERR_AUTH_DENIED:
                    //用户拒绝授权
                case BaseResp.ErrCode.ERR_USER_CANCEL:
                    //用户取消
                default:
                    //其他情况
                    map.putBoolean("success", false);            // @A1
                    break;
            }
            params.putMap("response", map);                      // @A0
            WeChatModule.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("finishedAuth", params);               // @A
        } else {
            switch (errCode) {
                case BaseResp.ErrCode.ERR_OK:
                    map.putBoolean("success", true);             // @S1
                    break;
                case BaseResp.ErrCode.ERR_COMM://一般错误
                case BaseResp.ErrCode.ERR_USER_CANCEL://用户取消
                case BaseResp.ErrCode.ERR_SENT_FAILED://发送失败
                case BaseResp.ErrCode.ERR_AUTH_DENIED://认证被否决
                case BaseResp.ErrCode.ERR_UNSUPPORT://不支持错误
                default:
                    map.putBoolean("success", false);            // @S1
                    break;
            }
            params.putMap("response", map);                      // @S0
            WeChatModule.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("finishedShare", params);              // @S
        }
        finish();
        // @所标记的key可以根据需要自行更改,对应你js文件中的key即可
    }
}