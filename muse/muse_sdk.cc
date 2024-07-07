#include <napi.h>

#include <iostream>

#include "MuseClientSdkApi.h"

using namespace Napi;

Value Fn(const CallbackInfo &info)
{
    Env env = info.Env();
    MuseSdk_Handle handle = nullptr;
    auto st = MuseSdk_initialize("provided-partner-identifier", &handle);
    if ((st == MuseSdk_Status_SUCCESS) && handle)
    {
        // Connection succeeded

        // Read UUID
        MuseSdk_UserInfo *user_info = nullptr;
        st = MuseSdk_getUserInfo(handle, &user_info);

        if ((st == MuseSdk_Status_SUCCESS) && user_info)
        {
            // If connected to the Hub, this should normally succeed.
            if (user_info->uuid)
                std::cout << "UUID: " << user_info->uuid << std::endl;

            MuseSdk_releaseUserInfo(&user_info);
            return String::New(env, "active:");
        }
        else
        {
            return String::New(env, "inactive:Did not retrieve UUID");
        }
    }
    return String::New(env, "fail:muse-connection-error");
}

Object Init(Env env, Object exports)
{
    exports.Set(Napi::String::New(env, "fn"),
                Napi::Function::New(env, Fn, "fn"));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)