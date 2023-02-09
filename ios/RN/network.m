#import "network.h"

#include <sys/types.h>

#include <sys/sysctl.h>

#import <mach/mach_host.h>

#include <netinet/in.h>

#include <arpa/inet.h>

#include <netdb.h>

#include <ifaddrs.h>

#include <sys/socket.h>

#include <net/if.h>

#include <net/if_dl.h>

#include <ifaddrs.h>



#if SUPPORTS_IOKIT_EXTENSIONS

#pragma mark IOKit miniheaders



#define kIODeviceTreePlane        "IODeviceTree"



enum {

  kIORegistryIterateRecursively    = 0x00000001,

  kIORegistryIterateParents        = 0x00000002

};



typedef mach_port_t    io_object_t;

typedef io_object_t    io_registry_entry_t;

typedef char        io_name_t[128];

typedef UInt32        IOOptionBits;



CFTypeRef IORegistryEntrySearchCFProperty(

                                io_registry_entry_t    entry,

                                const io_name_t        plane,

                                CFStringRef        key,

                                CFAllocatorRef        allocator,

                                IOOptionBits        options );

kern_return_t IOMasterPort( mach_port_t    bootstrapPort,mach_port_t *    masterPort );

io_registry_entry_t IORegistryGetRootEntry(mach_port_t    masterPort );

CFTypeRef IORegistryEntrySearchCFProperty(io_registry_entry_t    entry,const io_name_t        plane,CFStringRef        key,CFAllocatorRef        allocator,IOOptionBits        options );
kern_return_t   mach_port_deallocate(ipc_space_t   task,mach_port_name_t name);

@implementation UIDevice (IOKit_Extensions)

#pragma mark IOKit Utils

NSArray *getValue(NSString *iosearch)

{

  mach_port_t          masterPort;

  CFTypeID             propID = (CFTypeID) NULL;

  unsigned int         bufSize;



  kern_return_t kr = IOMasterPort(MACH_PORT_NULL, &masterPort);

  if (kr != noErr) return nil;



  io_registry_entry_t entry = IORegistryGetRootEntry(masterPort);

  if (entry == MACH_PORT_NULL) return nil;



  CFTypeRef prop = IORegistryEntrySearchCFProperty(entry,kIODeviceTreePlane, (CFStringRef) CFBridgingRetain(iosearch), nil,kIORegistryIterateRecursively);

  if (!prop) return nil;



  propID = CFGetTypeID(prop);

  if (!(propID == CFDataGetTypeID()))

  {

    mach_port_deallocate(mach_task_self(), masterPort);

    return nil;

  }



  CFDataRef propData = (CFDataRef) prop;

  if (!propData) return nil;



  bufSize = CFDataGetLength(propData);

  if (!bufSize) return nil;



  //NSString *p1 = [[[NSString alloc] initWithBytes:CFDataGetBytePtr(propData) length:bufSize encoding:1] autorelease];

  NSString *p1 = [[NSString alloc]initWithBytes:CFDataGetBytePtr(propData) length:bufSize encoding:NSUTF8StringEncoding];

  mach_port_deallocate(mach_task_self(), masterPort);

  return [p1 componentsSeparatedByString:@"/0"];

}



- (NSString *) imei

{

  NSArray *results = getValue(@"device-imei");

  if (results)

  {

    //return [results objectAtIndex:0];

    NSString *string_content = [results objectAtIndex:0];

    const char *char_content = [string_content UTF8String];

    return  [[NSString alloc] initWithCString:(const char*)char_content  encoding:NSUTF8StringEncoding];



  }

  //if(results)

  //{

  //    return [(NSString *)[results objectAtIndex:0] substringToIndex:2];

  // }

  return @"";

}



- (NSString *) serialnumber

{

  NSArray *results = getValue(@"serial-number");

  if (results) return [results objectAtIndex:0];

  return nil;

}



- (NSString *) backlightlevel

{

  NSArray *results = getValue(@"backlight-level");

  if (results) return [results objectAtIndex:0];

  return nil;

}



- (NSString *) macaddress

{

  int                    mib[6];

  size_t                len;

  char                *buf;

  unsigned char        *ptr;

  struct if_msghdr    *ifm;

  struct sockaddr_dl    *sdl;



  mib[0] = CTL_NET;

  mib[1] = AF_ROUTE;

  mib[2] = 0;

  mib[3] = AF_LINK;

  mib[4] = NET_RT_IFLIST;



  if ((mib[5] = if_nametoindex("en0")) == 0) {

    printf("Error: if_nametoindex error/n");

    return NULL;

  }



  if (sysctl(mib, 6, NULL, &len, NULL, 0) < 0) {

    printf("Error: sysctl, take 1/n");

    return NULL;

  }



  if ((buf = malloc(len)) == NULL) {

    printf("Could not allocate memory. error!/n");

    return NULL;

  }



  if (sysctl(mib, 6, buf, &len, NULL, 0) < 0) {

    printf("Error: sysctl, take 2");

    return NULL;

  }



  ifm = (struct if_msghdr *)buf;

  sdl = (struct sockaddr_dl *)(ifm + 1);

  ptr = (unsigned char *)LLADDR(sdl);



  NSString *outstring = [NSString stringWithFormat:@"%02x%02x%02x%02x%02x%02x", *ptr, *(ptr+1), *(ptr+2), *(ptr+3), *(ptr+4), *(ptr+5)];

  free(buf);

  return [outstring uppercaseString];

}







@end

#endif
