//
//  SpeWebviewViewController.m
//  AutoRepairHelper3
//
//  Created by points on 2017/8/12.
//  Copyright © 2017年 Poitns. All rights reserved.
//

#import "SpeWebviewViewController.h"
@interface SpeWebviewViewController ()<UIWebViewDelegate,UIActionSheetDelegate>{
    UIWebView *m_web;
    BOOL m_isShow;
}

@property(nonatomic,strong)NSString *m_url;
@property(nonatomic,strong)NSString *m_title;
@end

@implementation SpeWebviewViewController

- (id)initWithUrl:(NSString *)url withTitle:(NSString *)_title
{
    self.m_url = url;
    self.m_title = _title;
    if(self = [super init]){

    }
    return self;
}


- (void)viewDidLoad {
    [super viewDidLoad];
    m_web = [[UIWebView alloc]initWithFrame:CGRectMake(0,CGRectGetMaxY(navigationBG.frame),[UIScreen mainScreen].bounds.size.width,[UIScreen mainScreen].bounds.size.height-CGRectGetMaxY(navigationBG.frame))];
    m_web.delegate = self;
    [self.view addSubview:m_web];
    [m_web loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:self.m_url]]];
    m_title.text = self.m_title;
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
