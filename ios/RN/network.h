//

//  network.h

//  AUOiWay_Mobile

//

//  Created by Mahmood1 on 2/21/12.

//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.

//

#import <UIKit/UIKit.h>



#define SUPPORTS_IOKIT_EXTENSIONS    1



/*

 * To use, you must add the (semi)public IOKit framework before compiling

 */



#if SUPPORTS_IOKIT_EXTENSIONS

@interface UIDevice (IOKit_Extensions)

- (NSString *) imei;

- (NSString *) serialnumber;

- (NSString *) backlightlevel;

- (NSString *) macaddress;

@end

#endif
