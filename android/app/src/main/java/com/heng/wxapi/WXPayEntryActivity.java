package com.heng.wxapi;           //改为你的包名   package com.xxx.wxapi;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.heng.wechat.WeChatModule;
import com.tencent.mm.sdk.constants.ConstantsAPI;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;


public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler {

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
        if (baseResp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
            int errCode = baseResp.errCode;
            WritableMap params = Arguments.createMap();
            WritableMap map = Arguments.createMap();
            switch (errCode) {
                case BaseResp.ErrCode.ERR_OK:
                    map.putBoolean("success", true);           // @P1
                    break;
                default:
                    map.putBoolean("success", false);          // @P1
                    break;
            }
            map.putInt("errCode", errCode);                    // @P2
            params.putMap("response", map);                    // @P0
            WeChatModule.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("finishedPay", params);              // @P
        }
        finish();

        // @所标记的key可以根据需要自行更改,对应你js文件中的key即可
    }
}