package com.allison.transmission.modules;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import com.facebook.cache.disk.DiskStorageCache;
import com.facebook.cache.disk.FileCache;
import com.facebook.imagepipeline.core.ImagePipelineFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.allison.transmission.MainApplication;

import okhttp3.Cache;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import javax.annotation.Nullable;

/**
 * 通信Module类
 * Created by Song on 2017/2/17.
 */
public class SpeloggerModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;
    public static final String MODULE_NAME = "SpeLoggerModule";
    public static final String EVENT_NAME = "nativeCallRn";
    public static final String EVENT_NAME1 = "getPatchImgs";
    /**
     * 构造方法必须实现
     * @param reactContext
     */
    public SpeloggerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    /**
     * 在rn代码里面是需要这个名字来调用该类的方法
     * @return
     */
    @Override
    public String getName() {
        return MODULE_NAME;
    }


    @ReactMethod
    public void log(String _log) {

        Log.e("SpeloggerModule",_log);
    }

    /**
     * RN调用Native的方法
     * @param phone
     */
    @ReactMethod
    public void rnCallNative(String phone) {

        Log.e("SpeloggerModule",phone);
    }

    /**
     * Native调用RN
     * @param msg
     */
    public void nativeCallRn(String msg) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_NAME,msg);
    }

    /**
     * Callback 方式
     * rn调用Native,并获取返回值
     * @param msg
     * @param callback
     */
    @ReactMethod
    public void rnCallNativeFromCallback(String msg, Callback callback) {

        // 1.处理业务逻辑...
        String result = "处理结果：" + msg;
        // 2.回调RN,即将处理结果返回给RN
        callback.invoke(result);
    }

    /**
     * Promise
     * @param msg
     * @param promise
     */
    @ReactMethod
    public void rnCallNativeFromPromise(String msg, Promise promise) {

        Log.e("---","adasdasda");
        // 1.处理业务逻辑...
        String result = "处理结果：" + msg;
        // 2.回调RN,即将处理结果返回给RN
        promise.resolve(result);
    }
     
    /**
     * 向RN传递常量
     */  
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String,Object> params = new HashMap<>();
        params.put("Constant","我是android常量，传递给RN");
        params.put("isBackground",MainApplication.getInstance().isBackground()?"1":"0");
        return params;
    }


//
//    /**
//     * 获取okhttp缓存的大小
//     */
//    @ReactMethod
//    public void getCacheTotalSize(Callback callback){
//        try {
//            Cache cache = OkHttpClientProvider.getOkHttpClient().cache();
//
//            Log.e("SpeloggerModule->3",String.valueOf(cache.size()));
//
//            callback.invoke( String.valueOf((cache != null ? ((double)cache.size()) : 0)));
//        } catch(IOException e){
//            callback.invoke('0');
//        }
//    }


    /**
     * 获取okhttp缓存的大小
     */
    @ReactMethod
    public void getHttpCacheSize(Promise promise){
        try {
            Cache cache = OkHttpClientProvider.getOkHttpClient().cache();
            Log.e("SpeloggerModule->3",String.valueOf(cache.size()));

            promise.resolve(cache != null ? ((double)cache.size()) : 0);
        } catch(IOException e){
            promise.reject(e);
        }
    }
    /**
     * 因为防止fresco还没有初始化的时候,去拿缓存大小的话,这个时候还没有去计算缓存大小
     * 所以直接拿磁盘缓存大小可能为0,其源码中有一个方法去通知更新一下获取缓存大小
     */
    static Method update;
    private void updateCacheSize(DiskStorageCache cache) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        if (update == null){
            update = DiskStorageCache.class.getDeclaredMethod("maybeUpdateFileCacheSize");
            update.setAccessible(true);
        }
        update.invoke(cache);
    }


    @ReactMethod
    public void isBackground(Callback callback) {

        if(MainApplication.getInstance().isBackground()){
            callback.invoke('1');
        }else {
            callback.invoke('0');
        }
    }




        @ReactMethod
    public void getCacheTotalSize(Callback callback){
        FileCache cache1 = ImagePipelineFactory.getInstance().getMainFileCache();
        long size1 = cache1.getSize();
        if (size1 < 0){
            try {
                updateCacheSize((DiskStorageCache)cache1);
            } catch (Exception e){
                callback.invoke(0);
                return;
            }
            size1 = cache1.getSize();
        }
        FileCache cache2 = ImagePipelineFactory.getInstance().getSmallImageFileCache();
        long size2 = cache2.getSize();
        if (size2 < 0){
            try {
                updateCacheSize((DiskStorageCache)cache2);
            } catch (Exception e){
                callback.invoke(0);
                return;
            }
            size2 = cache2.getSize();
        }

        double f = size1+size2;
        callback.invoke(getFormatSize(f));
    }


    public static String getFormatSize(double size) {
        double kiloByte = size / 1024;
        if (kiloByte < 1) {
            return size + "Byte";
        }

        double megaByte = kiloByte / 1024;
        if (megaByte < 1) {
            BigDecimal result1 = new BigDecimal(Double.toString(kiloByte));
            return result1.setScale(1, BigDecimal.ROUND_HALF_UP)
                    .toPlainString() + "KB";
        }

        double gigaByte = megaByte / 1024;
        if (gigaByte < 1) {
            BigDecimal result2 = new BigDecimal(Double.toString(megaByte));
            return result2.setScale(1, BigDecimal.ROUND_HALF_UP)
                    .toPlainString() + "MB";
        }

        double teraBytes = gigaByte / 1024;
        if (teraBytes < 1) {
            BigDecimal result3 = new BigDecimal(Double.toString(gigaByte));
            return result3.setScale(1, BigDecimal.ROUND_HALF_UP)
                    .toPlainString() + "GB";
        }
        BigDecimal result4 = new BigDecimal(teraBytes);
        return result4.setScale(1, BigDecimal.ROUND_HALF_UP).toPlainString()
                + "TB";
    }


    @ReactMethod
    public void clearCache(Callback callback){
        FileCache cache1 = ImagePipelineFactory.getInstance().getMainFileCache();
        cache1.clearAll();
        FileCache cache2 = ImagePipelineFactory.getInstance().getSmallImageFileCache();
        cache2.clearAll();
        callback.invoke(String.valueOf(0));
    }
}
