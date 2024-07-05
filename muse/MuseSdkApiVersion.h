/*
 * MuseClientSdk
 * Copyright 2024 Muse. All rights reserved.
 *
 * Use, distribution and modification of this code and associated binaries is subject to license.
 */

#pragma once

/*
  This header file provides macros and definitions that specify the version numbers for both the
  SDK API and the associated binary files.
*/

#define MUSESDK_VERSION_MAJOR 0
#define MUSESDK_VERSION_MINOR 9
#define MUSESDK_VERSION_REVIS 2

#define MUSESDK_VERSION_STR2(a, b, c) #a "." #b "." #c
#define MUSESDK_VERSION_STR(a, b, c) MUSESDK_VERSION_STR2(a, b, c)
#define MUSESDK_VERSION_STRING MUSESDK_VERSION_STR(MUSESDK_VERSION_MAJOR, MUSESDK_VERSION_MINOR, MUSESDK_VERSION_REVIS)
/* CI build 6c6670545b26d2cceb45cebc3c4ecaa75daebd88 - 2024-05-07 09:53:38 UTC */
