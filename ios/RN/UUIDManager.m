//
//  UUIDManager.m
//  jnzp
//
//  Created by 皇甫启飞 on 2018/1/30.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "UUIDManager.h"
#import "KeyChainManager.h"

static NSString * const KEY_IN_KEYCHAIN = @"com.junqiao.jnzp";

@implementation UUIDManager

+(void)saveUUID:(NSString *)uuid
{
  if (uuid && uuid.length > 0) {
    [KeyChainManager save:KEY_IN_KEYCHAIN data:uuid];
  }
}

+(NSString *)getUUID
{
  NSString *uuid = [KeyChainManager load:KEY_IN_KEYCHAIN];

  if (!uuid || uuid.length == 0) {
    NSString *uuid = [[NSUUID UUID] UUIDString];

    [self saveUUID:uuid];
  }
  return uuid;
}

+(void)deleteUUID
{
  [KeyChainManager delete:KEY_IN_KEYCHAIN];
}

@end
