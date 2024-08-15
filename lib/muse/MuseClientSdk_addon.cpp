/*
 * MuseClientSdk
 * Copyright 2024 Muse. All rights reserved.
 *
 * Add-on example code showing how to bind the C SDK to a node.js application.
 *
 */

#include <node.h>

#include "MuseClientSdkApi.h"

void initializeTestMode(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    v8::HandleScope scope(isolate);

    if (args.Length() != 1 || !args[0]->IsBoolean())
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, MuseSdk_Status_INVALID_ARGS));
        return;
    }

    bool mock_user = args[0]->BooleanValue(isolate);
    MuseSdk_Handle handle;
    MuseSdk_Status status = MuseSdk_initializeTestMode(mock_user, &handle);

    v8::Local<v8::Object> result = v8::Object::New(isolate);
    result->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "status").ToLocalChecked(),
                v8::Number::New(isolate, status));
    result->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "handle").ToLocalChecked(),
                v8::Number::New(isolate, reinterpret_cast<uint64_t>(handle)));

    args.GetReturnValue().Set(result);
}

void initializeElectron(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    v8::HandleScope scope(isolate);

    if (args.Length() != 1 || !args[0]->IsString())
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, MuseSdk_Status_INVALID_ARGS));
        return;
    }

    v8::String::Utf8Value str(args.GetIsolate(), args[0]);
    if (*str == nullptr)
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, MuseSdk_Status_INVALID_ARGS));
        return;
    }
    const char *cstr = *str;

    MuseSdk_Handle handle{};
    MuseSdk_Status status = MuseSdk_initializeElectron(&handle, cstr);

    v8::Local<v8::Object> result = v8::Object::New(isolate);
    result->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "status").ToLocalChecked(),
                v8::Number::New(isolate, status));
    result->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "handle").ToLocalChecked(),
                v8::Number::New(isolate, reinterpret_cast<uint64_t>(handle)));

    args.GetReturnValue().Set(result);
}

void finalize(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    v8::HandleScope scope(isolate);

    if (args.Length() != 1 || !args[0]->IsNumber())
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, MuseSdk_Status_INVALID_ARGS));
        return;
    }

    uint64_t handle_arg = args[0]->IntegerValue(isolate->GetCurrentContext()).FromJust();
    MuseSdk_Handle handle = reinterpret_cast<MuseSdk_Handle>(handle_arg);

    MuseSdk_Status status = MuseSdk_finalize(&handle);

    args.GetReturnValue().Set(v8::Number::New(isolate, status));
}

void getUserInfo(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    v8::HandleScope scope(isolate);

    if (args.Length() != 1 || !args[0]->IsNumber())
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, MuseSdk_Status_INVALID_ARGS));
        return;
    }

    uint64_t handle_arg = args[0]->IntegerValue(isolate->GetCurrentContext()).FromJust();
    MuseSdk_Handle handle = reinterpret_cast<MuseSdk_Handle>(handle_arg);

    MuseSdk_UserInfo *data{};
    MuseSdk_Status status = MuseSdk_getUserInfo(handle, &data);

    v8::Local<v8::Object> result = v8::Object::New(isolate);
    result->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "status").ToLocalChecked(),
                v8::Number::New(isolate, status));

    if (status == MuseSdk_Status_SUCCESS)
    {
        v8::Local<v8::Object> info_obj = v8::Object::New(isolate);
        info_obj->Set(isolate->GetCurrentContext(),
                      v8::String::NewFromUtf8(isolate, "uuid").ToLocalChecked(),
                      v8::String::NewFromUtf8(isolate, data->uuid).ToLocalChecked());

        result->Set(isolate->GetCurrentContext(),
                    v8::String::NewFromUtf8(isolate, "userInfo").ToLocalChecked(),
                    info_obj);

        MuseSdk_releaseUserInfo(&data);
    }
    else
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, status));
    }

    args.GetReturnValue().Set(result);
}

void getSku(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    v8::HandleScope scope(isolate);

    if (args.Length() != 1 || !args[0]->IsNumber())
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, MuseSdk_Status_INVALID_ARGS));
        return;
    }

    uint64_t handle_arg = args[0]->IntegerValue(isolate->GetCurrentContext()).FromJust();
    MuseSdk_Handle handle = reinterpret_cast<MuseSdk_Handle>(handle_arg);

    MuseSdk_Sku *data{};
    MuseSdk_Status status = MuseSdk_getSku(handle, &data);

    v8::Local<v8::Object> result = v8::Object::New(isolate);
    result->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "status").ToLocalChecked(),
                v8::Number::New(isolate, status));

    if (status == MuseSdk_Status_SUCCESS)
    {
        v8::Local<v8::Object> info_obj = v8::Object::New(isolate);
        info_obj->Set(isolate->GetCurrentContext(),
                      v8::String::NewFromUtf8(isolate, "sku").ToLocalChecked(),
                      v8::String::NewFromUtf8(isolate, data->sku).ToLocalChecked());

        result->Set(isolate->GetCurrentContext(),
                    v8::String::NewFromUtf8(isolate, "sku").ToLocalChecked(),
                    info_obj);

        MuseSdk_releaseSku(&data);
    }
    else
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, status));
    }

    args.GetReturnValue().Set(result);
}

void getSubscriptionOption(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    v8::HandleScope scope(isolate);

    if (args.Length() != 1 || !args[0]->IsNumber())
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, MuseSdk_Status_INVALID_ARGS));
        return;
    }

    uint64_t handle_arg = args[0]->IntegerValue(isolate->GetCurrentContext()).FromJust();
    MuseSdk_Handle handle = reinterpret_cast<MuseSdk_Handle>(handle_arg);

    MuseSdk_SubscriptionOption *data{};
    MuseSdk_Status status = MuseSdk_getSubscriptionOption(handle, &data);

    v8::Local<v8::Object> result = v8::Object::New(isolate);
    result->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "status").ToLocalChecked(),
                v8::Number::New(isolate, status));

    if (status == MuseSdk_Status_SUCCESS)
    {
        v8::Local<v8::Object> info_obj = v8::Object::New(isolate);
        info_obj->Set(isolate->GetCurrentContext(),
                      v8::String::NewFromUtf8(isolate, "assignedId").ToLocalChecked(),
                      v8::String::NewFromUtf8(isolate, data->assigned_id).ToLocalChecked());

        result->Set(isolate->GetCurrentContext(),
                    v8::String::NewFromUtf8(isolate, "subscriptionOption").ToLocalChecked(),
                    info_obj);

        MuseSdk_releaseSubscriptionOption(&data);
    }
    else
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, status));
    }

    args.GetReturnValue().Set(result);
}

void getActivationStatus(const v8::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Isolate *isolate = args.GetIsolate();
    v8::HandleScope scope(isolate);

    if (args.Length() != 1 || !args[0]->IsNumber())
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, MuseSdk_Status_INVALID_ARGS));
        return;
    }

    uint64_t handle_arg = args[0]->IntegerValue(isolate->GetCurrentContext()).FromJust();
    MuseSdk_Handle handle = reinterpret_cast<MuseSdk_Handle>(handle_arg);

    MuseSdk_ActivationStatus data;
    MuseSdk_Status status = MuseSdk_getActivationStatus(handle, &data);

    v8::Local<v8::Object> result = v8::Object::New(isolate);
    result->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "status").ToLocalChecked(),
                v8::Number::New(isolate, status));

    if (status == MuseSdk_Status_SUCCESS)
    {
        result->Set(isolate->GetCurrentContext(), v8::String::NewFromUtf8(isolate, "activationStatus").ToLocalChecked(),
                    v8::Number::New(isolate, data));
    }
    else
    {
        args.GetReturnValue().Set(v8::Number::New(isolate, status));
    }

    args.GetReturnValue().Set(result);
}

void declareAddon(v8::Local<v8::Object> exports)
{
    v8::Isolate *isolate = exports->GetIsolate();
    v8::Local<v8::Context> context = isolate->GetCurrentContext();

    exports->Set(context,
                 v8::String::NewFromUtf8(isolate, "initializeTestMode").ToLocalChecked(),
                 v8::FunctionTemplate::New(isolate, initializeTestMode)->GetFunction(context).ToLocalChecked());

    exports->Set(context,
                 v8::String::NewFromUtf8(isolate, "initializeElectron").ToLocalChecked(),
                 v8::FunctionTemplate::New(isolate, initializeElectron)->GetFunction(context).ToLocalChecked());

    exports->Set(context,
                 v8::String::NewFromUtf8(isolate, "finalize").ToLocalChecked(),
                 v8::FunctionTemplate::New(isolate, finalize)->GetFunction(context).ToLocalChecked());

    exports->Set(context,
                 v8::String::NewFromUtf8(isolate, "getUserInfo").ToLocalChecked(),
                 v8::FunctionTemplate::New(isolate, getUserInfo)->GetFunction(context).ToLocalChecked());

    exports->Set(context,
                 v8::String::NewFromUtf8(isolate, "getSku").ToLocalChecked(),
                 v8::FunctionTemplate::New(isolate, getSku)->GetFunction(context).ToLocalChecked());

    exports->Set(context,
                 v8::String::NewFromUtf8(isolate, "getSubscriptionOption").ToLocalChecked(),
                 v8::FunctionTemplate::New(isolate, getSubscriptionOption)->GetFunction(context).ToLocalChecked());

    exports->Set(context,
                 v8::String::NewFromUtf8(isolate, "getActivationStatus").ToLocalChecked(),
                 v8::FunctionTemplate::New(isolate, getActivationStatus)->GetFunction(context).ToLocalChecked());
}

NODE_MODULE(NODE_GYP_MODULE_NAME, declareAddon)
