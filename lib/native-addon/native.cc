#include <node.h>
#include <v8.h>
#include <cmath>
#include <vector>
#include <string>

using namespace v8;

// A dummy function that returns a string
void DummyFunction(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "This is a dummy function.").ToLocalChecked());
}

// A dummy function that performs some arithmetic calculations
void CalculateSum(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    double sum = 0.0;
    for (int i = 0; i < 100000; ++i)
    {
        sum += std::sqrt(i) * std::sin(i) - std::cos(i);
    }

    args.GetReturnValue().Set(Number::New(isolate, sum));
}

// A dummy function that performs string operations
void ProcessString(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    std::string baseString = "This is a test string. ";
    std::string resultString;

    for (int i = 0; i < 10000; ++i)
    {
        resultString += baseString;
    }

    args.GetReturnValue().Set(String::NewFromUtf8(isolate, resultString.c_str()).ToLocalChecked());
}

// A dummy function that performs vector operations
void VectorOperations(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    Local<Array> result = Array::New(isolate);

    std::vector<int> numbers;
    for (int i = 0; i < 10000; ++i)
    {
        numbers.push_back(i * 2);
    }

    for (size_t i = 0; i < numbers.size(); ++i)
    {
        result->Set(isolate->GetCurrentContext(), i, Number::New(isolate, numbers[i])).FromJust();
    }

    args.GetReturnValue().Set(result);
}

// Initialize the module and export the functions
void Initialize(Local<Object> exports)
{
    NODE_SET_METHOD(exports, "dummyFunction", DummyFunction);
    NODE_SET_METHOD(exports, "calculateSum", CalculateSum);
    NODE_SET_METHOD(exports, "processString", ProcessString);
    NODE_SET_METHOD(exports, "vectorOperations", VectorOperations);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
