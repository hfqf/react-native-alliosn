//
//  SpeLoggerModule.m
//  jnzp
//
//  Created by 皇甫启飞 on 2018/2/1.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "SpeLoggerModule.h"
#import "SpeWebviewViewController.h"
#import <React/RCTBridgeModule.h>


@interface SpeLoggerModule ()<RCTBridgeModule>
@end
@implementation SpeLoggerModule
RCT_EXPORT_MODULE(SpeLoggerModule)


- (NSDictionary *)constantsToExport{
//  params.put("Constant","我是常量，传递给RN");

  return @{@"registrationId":@"我是ios常量，传递给RN"};
}

RCT_EXPORT_METHOD(log:(NSString *)content) {
  NSLog(@"SpeLoggerModule->%@", content);
}

RCT_EXPORT_METHOD(rnCallNative:(NSString *)content) {
  NSLog(@"SpeLoggerModule->%@", content);
}



RCT_EXPORT_METHOD(rnCallNativeFromCallback:(NSString *)msg callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"SpeLoggerModule->%@", msg);
  callback(@[@"rnCallNativeFromCallback"]);
}

RCT_EXPORT_METHOD(getCacheTotalSize:(RCTResponseSenderBlock)callback) {
  callback(@[[NSString stringWithFormat:@"%.1fMB",[self sizeCache]]]);
}


RCT_EXPORT_METHOD(clearCache:(RCTResponseSenderBlock)callback) {
  callback(@[[NSString stringWithFormat:@"%lu",[self clearCacheWithFilePath] ?1:0]]);
}

RCT_EXPORT_METHOD(push2WebDetail:(NSString *)url title:(NSString *)title) {

  dispatch_async(dispatch_get_main_queue(), ^{
    UINavigationController *navi = (UINavigationController *)[UIApplication sharedApplication].keyWindow.rootViewController;
    SpeWebviewViewController *web = [[SpeWebviewViewController alloc]initWithUrl:url withTitle:title];
    [navi pushViewController:web animated:YES];
  });

}



-(float)fileSizeForDir:(NSString*)path//计算文件夹下文件的总大小
{

  NSFileManager *fileManager = [[NSFileManager alloc] init];
  float size =0;
  NSArray* array = [fileManager contentsOfDirectoryAtPath:path error:nil];
  for(int i = 0; i<[array count]; i++)
  {
    NSString *fullPath = [path stringByAppendingPathComponent:[array objectAtIndex:i]];

    BOOL isDir;
    if ( !([fileManager fileExistsAtPath:fullPath isDirectory:&isDir] && isDir) )
    {
      NSDictionary *fileAttributeDic=[fileManager attributesOfItemAtPath:fullPath error:nil];
      size+= fileAttributeDic.fileSize/ 1024.0/1024.0;
    }
    else
    {
      [self fileSizeForDir:fullPath];
    }
  }
  return size;
}


- (float)sizeCache{
  NSString *path = [[NSSearchPathForDirectoriesInDomains(NSLibraryDirectory,
                                                         NSUserDomainMask, YES)firstObject]stringByAppendingPathComponent:@"Caches/com.allisontransmission.allisontransmission/fsCachedData"];
  return [self fileSizeForDir:path];

}


- (BOOL)clearCacheWithFilePath{

  NSString *path = [[NSSearchPathForDirectoriesInDomains(NSLibraryDirectory,
                                                         NSUserDomainMask, YES)firstObject]stringByAppendingPathComponent:@"Caches/com.allisontransmission.allisontransmission/fsCachedData"];
  //拿到path路径的下一级目录的子文件夹
  NSArray *subPathArr = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:path error:nil];

  NSString *filePath = nil;

  NSError *error = nil;

  for (NSString *subPath in subPathArr)
  {
    filePath = [path stringByAppendingPathComponent:subPath];

    //删除子文件夹
    [[NSFileManager defaultManager] removeItemAtPath:filePath error:&error];
    if (error) {
      return NO;
    }
  }
  return YES;
}


@end
