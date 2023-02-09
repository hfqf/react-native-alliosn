//
//  BaseViewController.m
//  xxt_xj
//
//  Created by Points on 13-11-25.
//  Copyright (c) 2013年 Points. All rights reserved.
//

#import "BaseViewController.h"
#import "PublicDefine.h"
@interface BaseViewController ()
{

}

@end

@implementation BaseViewController

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter]removeObserver:self];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];

}


- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
}


- (void)viewDidAppear:(BOOL)animated
{
    [self.navigationController.navigationBar setHidden:YES];
}

- (void)viewDidLoad
{
    [super viewDidLoad];

    
    if ([self.navigationController respondsToSelector:@selector(interactivePopGestureRecognizer)]) {
        self.navigationController.interactivePopGestureRecognizer.enabled = YES;
    }

    [self.navigationController setNavigationBarHidden:YES];
    [self.navigationController.navigationBar setHidden:YES];

    navigationBG = [[UIImageView alloc]initWithFrame:CGRectMake(0,0, MAIN_WIDTH, HEIGHT_NAVIGATION)];
    navigationBG.userInteractionEnabled = YES;
    [navigationBG setBackgroundColor:UIColorFromRGB(0x0052a4)];
    [self.view setBackgroundColor:[UIColor whiteColor]];
    [self.view addSubview:navigationBG];
    
    backBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    [backBtn setFrame:CGRectMake(0,DISTANCE_TOP,61,44)];
    [backBtn setBackgroundColor:[UIColor clearColor]];
    [backBtn setTitle:@"返回" forState:UIControlStateNormal];
    [backBtn setTitleColor:UIColorFromRGB(0xffffff) forState:UIControlStateNormal];
    [backBtn addTarget:self action:@selector(backBtnClicked) forControlEvents:UIControlEventTouchUpInside];
    [navigationBG addSubview:backBtn];
    
    m_title= [[UILabel alloc]initWithFrame:CGRectMake(50,DISTANCE_TOP+7,MAIN_WIDTH-100, 30)];
    [m_title setFont:[UIFont systemFontOfSize:19]];
    [m_title setBackgroundColor:[UIColor clearColor]];
    [m_title setTextAlignment:NSTextAlignmentCenter];
    [m_title setTextColor:UIColorFromRGB(0xffffff)];
    [navigationBG addSubview:m_title];
}

- (UIStatusBarStyle)preferredStatusBarStyle
{
    return UIStatusBarStyleDefault;
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}


- (void)backBtnClicked
{
    [self.navigationController popViewControllerAnimated:YES];
}


@end
