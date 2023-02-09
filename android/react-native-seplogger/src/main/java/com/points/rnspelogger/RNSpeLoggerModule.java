package com.allison.rnspelogger;

import android.content.Context;
import android.telephony.TelephonyManager;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class RNSpeLoggerModule extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;
    static final String TAG = "RNSpeLoggerModule";

    public RNSpeLoggerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNSpeLoggerModule";
    }

    @ReactMethod
    public void   log_d(String _log){
        Log.d(TAG,_log);
    }
    @ReactMethod
    public void   log_e(String _log){
        Log.e(TAG,_log);
    }
    @ReactMethod
    public void   log_i(String _log){
        Log.i(TAG,_log);
    }

    @ReactMethod
    public void   log_w(String _log){
        Log.w(TAG,_log);
    }

    @ReactMethod
    public void   log_v(String _log){
        Log.v(TAG,_log);
    }


    public void nativeCallRn(String msg) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("nativeCallRn",msg);
    }
}
