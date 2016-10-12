//
//  ViewController.m
//  验证字符串
//
//  Created by paisheng on 16/10/11.
//  Copyright © 2016年 paisheng. All rights reserved.
//

#import "splitTextByWidth.h"

@implementation splitTextByWidth
@synthesize bridge =_bridge;
//访问 RN的组件
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(processString:(NSString *)input andFont:(UIFont *)font maxSize:(CGSize)maxSize callback:(RCTResponseSenderBlock)callback){
  NSMutableArray *words = [[NSMutableArray alloc] init];
  NSMutableArray *startWords = [[NSMutableArray alloc] init];
  NSMutableArray *endWords = [[NSMutableArray alloc] init];
  NSMutableArray *newWords = [[NSMutableArray alloc] init];
  float width = 0;
  int index = 0;
  int weizhi =0;
  const char *str = [input cStringUsingEncoding:NSUTF8StringEncoding];
  char *word;
  for (int i = 0; i < strlen(str);) {
    int len = 0;
    if (str[i] >= 0xFFFFFFFC) {
      len = 6;
    } else if (str[i] >= 0xFFFFFFF8) {
      len = 5;
    } else if (str[i] >= 0xFFFFFFF0) {
      len = 4;
    } else if (str[i] >= 0xFFFFFFE0) {
      len = 3;
    } else if (str[i] >= 0xFFFFFFC0) {
      len = 2;
    } else if (str[i] >= 0x00) {
      len = 1;
    }
    
    word = malloc(sizeof(char) * (len + 1));
    for (int j = 0; j < len; j++) {
      word[j] = str[j + i];
    }
    word[len] = '\0';
    i = i + len;
    
    NSString *oneWord = [NSString stringWithCString:word encoding:NSUTF8StringEncoding];
    free(word);
    [words addObject:oneWord];
  }
  for (int i =0; i<words.count; i++) {
    NSDictionary *attrs = @{NSFontAttributeName:font};
    CGSize labelSize = [words[i] boundingRectWithSize:maxSize options:NSStringDrawingUsesLineFragmentOrigin attributes:attrs context:nil].size;
    width =width +labelSize.width;
    if(width>maxSize.width){
      for (int j = 0;j<i+1 ; j++) {
        [startWords addObject:words[j]];
        
      }
      width =0;
      NSLog(@"%d",i);
      if (index ==0) {
        NSLog(@"%@",[startWords componentsJoinedByString:@""]);
        NSString *string =[startWords componentsJoinedByString:@""];
        [newWords addObject:string];
        [startWords removeAllObjects];
      }else{
        [startWords removeObjectsInRange:NSMakeRange(0,weizhi+1)];
        NSLog(@"%@",[startWords componentsJoinedByString:@""]);
        NSString *string =[startWords componentsJoinedByString:@""];
        [newWords addObject:string];
        [startWords removeAllObjects];
      }
      
      weizhi = i;
      index++;
    }
    
  }
  //    字符串末尾长度不足的字符ß
  if (weizhi == 0) {
    for (int i = weizhi; i<words.count; i++) {
      NSLog(@"%@",words[i]);
      [endWords addObject:words[i]];
      
    }
  } else {
    for (int i = weizhi+1; i<words.count; i++) {
      NSLog(@"%@",words[i]);
      [endWords addObject:words[i]];
      
    }
  }
  
  NSLog(@"%@",endWords);
  NSString *endString =[endWords componentsJoinedByString:@""];
  [newWords addObject:endString];
  NSLog(@"newWords=%@",newWords);
  callback(@[[NSNull null],newWords]);

}


@end
