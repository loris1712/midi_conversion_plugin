/*
 * MuseClientSdk
 * Copyright 2024 Muse. All rights reserved.
 *
 * Use, distribution and modification of this code and associated binaries is subject to license.
 */

#pragma once

#if defined(__APPLE__)
#if defined(MUSECLIENTSDK_DYNAMIC) || defined(MUSECLIENTSDK_STATIC)
#define MuseSdkApi __attribute__((visibility("default")))
#else
#define MuseSdkApi
#endif
#elif defined(_MSC_VER)
#if defined(MUSECLIENTSDK_STATIC)
#define MuseSdkApi
#else
#if defined(MUSECLIENTSDK_DYNAMIC)
#define MuseSdkApi __declspec(dllexport)
#else
#define MuseSdkApi __declspec(dllimport)
#endif
#endif
#endif

#ifdef __cplusplus
extern "C" {
#endif

/*
  Muse SDK

  - The API is single threaded.
  - All functions are synchronous and can block the caller up to a few seconds while waiting for external resources.
    If responsiveness is a concern, it is suggested to use this API on a dedicated thread instead of the UI thread.
  - All returned char* fields are either valid null-terminated strings, or nullptr if not available
  - All returned memory structures must be released using the dedicated `MuseSdk_releaseXXX` functions
*/

/* Status code returned by some API functions */
typedef enum
{
    MuseSdk_Status_SUCCESS = 0,
    MuseSdk_Status_INVALID_ARGS,
    MuseSdk_Status_CONNECTION_ERROR,
    MuseSdk_Status_INVALID_DATA_RECEIVED,
} MuseSdk_Status;

/* Opaque type for the MuseSdk */
typedef void* MuseSdk_Handle;

/**************************************************************************
  Initialization and finalization
*/

/*
  Initializes the SDK<=>MuseHUb channel for subsequent SDK API calls.
  `identifier` is the null-terminated ID assigned to the client software
  `handle` receives a MuseSdk_Handle, or nullptr if failed.
  Returns a status code to troubleshoot errors.
*/
MuseSdkApi MuseSdk_Status MuseSdk_initialize(const char* identifier, MuseSdk_Handle* handle);

/*
  Releases the SDK<=>MuseHUb channel and any associated resources.
  `handle` must be a valid handle previously returned by a MuseSdk_initialize call.
*/
MuseSdkApi void MuseSdk_finalize(MuseSdk_Handle* handle);

/**************************************************************************
   User information
*/

typedef struct
{
    char* uuid;
} MuseSdk_UserInfo;

/*
  Retrieves the user ID associated with the active MuseHub account.
  `handle` must be a valid handle previously returned by a MuseSdk_initialize call.
  `info` must point to a MuseSdk_UserInfo pointer that receives the user information associated with the active
  MuseHub account. The returned pointer must be released with `MuseSdk_releaseUserInfo` after use.
*/
MuseSdkApi MuseSdk_Status MuseSdk_getUserInfo(MuseSdk_Handle handle, MuseSdk_UserInfo** info);

/* Releases a MuseSdk_UserInfo struct previously created by `MuseSdk_getUserInfo`. */
MuseSdkApi void MuseSdk_releaseUserInfo(MuseSdk_UserInfo** info);

/**************************************************************************
  Product information
*/

typedef struct
{
    char* sku;
} MuseSdk_Sku;

/*
  Retrieves the SKU specified in Muse Cosmos for the current product.
  `handle` must be a valid handle previously returned by a MuseSdk_initialize call.
  `sku` must point to a MuseSdk_Sku pointer that receives the SKU entered in Cosmos, if any.
  The returned pointer must be released with `MuseSdk_releaseSku` after use.
*/
MuseSdkApi MuseSdk_Status MuseSdk_getSku(MuseSdk_Handle handle, MuseSdk_Sku** info);

/* Releases a MuseSdk_Sku struct previously created by `MuseSdk_getSku`. */
MuseSdkApi void MuseSdk_releaseSku(MuseSdk_Sku** info);

typedef struct
{
    char* assigned_id;
} MuseSdk_SubscriptionOption;

/*
  Retrieves the ID specified in Muse Cosmos for the currently authorized product subscription/option.
  `handle` must be a valid handle previously returned by a MuseSdk_initialize call.
  `id` must point to a MuseSdk_SubscriptionOption pointer that receives the user information.
  The returned pointer must be released with `MuseSdk_releaseSubscriptionOption` after use.
*/
MuseSdkApi MuseSdk_Status MuseSdk_getSubscriptionOption(MuseSdk_Handle handle, MuseSdk_SubscriptionOption** info);

/* Releases a MuseSdk_SubscriptionOption struct previously created by `MuseSdk_getSubscriptionOption`. */
MuseSdkApi void MuseSdk_releaseSubscriptionOption(MuseSdk_SubscriptionOption** info);

typedef enum
{
    MuseSdk_ActivationStatus_INACTIVE = 0,
    MuseSdk_ActivationStatus_ACTIVE,
} MuseSdk_ActivationStatus;

/*
  Retrieves the current activation status for the running product.
  For DRM-protected products, this will always return ACTIVE.
  `handle` must be a valid handle previously returned by a MuseSdk_initialize call.
  `status` must point to a MuseSdk_ActivationStatus pointer that receives the user information.
*/
MuseSdkApi MuseSdk_Status MuseSdk_getActivationStatus(MuseSdk_Handle handle, MuseSdk_ActivationStatus* status);

#ifdef __cplusplus
}
#endif
