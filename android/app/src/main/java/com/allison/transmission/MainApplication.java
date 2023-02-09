package com.allison.transmission;

import android.app.ActivityManager;
import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.beefe.picker.PickerViewPackage;
import com.burnweb.rnwebview.RNWebViewPackage;
import com.facebook.react.ReactApplication;
import cn.jpush.reactnativejpush.JPushPackage;
import codes.simen.IMEI.IMEI;

import com.allison.transmission.modules.SpeLoggerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;
import com.allison.transmission.module.SharePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.umeng.socialize.Config;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

public class MainApplication extends Application implements ReactApplication {




  // 设置为 true 将不弹出 toast
  private boolean SHUTDOWN_TOAST = true;
  // 设置为 true 将不打印 log
  private boolean SHUTDOWN_LOG = true;

  private static MainApplication app;

  public static MainApplication getInstance() {
    return app;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;

    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
              //start
            new RNWebViewPackage(),
            new SplashScreenReactPackage(),
            new PickerViewPackage(),
            new RNNetworkInfoPackage(),
            new IMEI(),
            new RNDeviceInfo(),
            new SharePackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new SpeLoggerPackage()
            //end
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this,false);
    Config.shareType = "react native";
    UMShareAPI.get(this);
    app = this;
  }

  // 配置平台key、secret信息
  {

    PlatformConfig.setWeixin("wx505064427218a16c", "abd3a34d4fc392a6ff0e80ec767fd8a7");
    PlatformConfig.setQQZone("1106733276", "gWmUoj54PjlNQ7no");
  }


  public    boolean isBackground( ) {
    Context context = getApplicationContext();
    ActivityManager activityManager = (ActivityManager) context
            .getSystemService(Context.ACTIVITY_SERVICE);
    List<ActivityManager.RunningAppProcessInfo> appProcesses = activityManager
            .getRunningAppProcesses();
    for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
      if (appProcess.processName.equals(context.getPackageName())) {
                /*
                BACKGROUND=400 EMPTY=500 FOREGROUND=100
                GONE=1000 PERCEPTIBLE=130 SERVICE=300 ISIBLE=200
                 */
        Log.i(context.getPackageName(), "此appimportace ="
                + appProcess.importance
                + ",context.getClass().getName()="
                + context.getClass().getName());
        if (appProcess.importance != ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND) {
          Log.i(context.getPackageName(), "处于后台"
                  + appProcess.processName);
          return true;
        } else {
          Log.i(context.getPackageName(), "处于前台"
                  + appProcess.processName);
          return false;
        }
      }
    }
    return false;
  }

}
