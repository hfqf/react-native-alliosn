//
//  Oc2RnManager.m
//  CoreApp
//
//  Created by 王涛 on 2018/1/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "Oc2RnManager.h"

#import <AdSupport/AdSupport.h>
#import <UIKit/UIKit.h>
#import "UUIDManager.h"
//#import <React/RCTBridgeModule.h>
#import "RCTBridgeModule.h"

@interface Oc2RnManager ()<RCTBridgeModule>
@end

@implementation Oc2RnManager

RCT_EXPORT_MODULE();

//绑定用户
RCT_EXPORT_METHOD(MPushBindUser:(NSString *)userId)
{
//  [[MPMessageHandler shareMessageHandler] bindUserWithUserId:userId];
  NSLog(@"%@",userId);
}


// 授权第三方登录
RCT_EXPORT_METHOD(getDeviceInfos: (RCTPromiseResolveBlock) resolveBlock reject:(RCTPromiseRejectBlock)rejectBlock) {

  if([[ASIdentifierManager sharedManager] isAdvertisingTrackingEnabled]){
    NSString *idfa = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
    resolveBlock(@{@"idfa":idfa});
  }else{
    resolveBlock(@{@"idfa":@""});

  }
}


@end
