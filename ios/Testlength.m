//
//  Testlength.m
//  svg
//
//  Created by 钟进峰 on 16/9/22.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "Testlength.h"

@implementation Testlength
@synthesize bridge =_bridge;
//访问 RN的组件
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(processString:(NSString *)input andFont:(UIFont *)font maxSize:(CGSize)maxSize callback:(RCTResponseSenderBlock)callback)
{
  NSDictionary *attrs = @{NSFontAttributeName : font};
  CGSize labelSize = [input boundingRectWithSize:maxSize options:NSStringDrawingUsesLineFragmentOrigin attributes:attrs context:nil].size;
  NSString *w=[NSString stringWithFormat:@"%f",labelSize.width];
  NSString *h=[NSString stringWithFormat:@"%f",labelSize.height];
  callback(@[[NSNull null], w, h]);
}


@end
