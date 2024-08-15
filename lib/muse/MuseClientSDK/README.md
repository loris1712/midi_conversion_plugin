# Muse Hub SDK

This is a preview of the Muse client SDK.

The SDK allows a partner application to connect to the Muse Hub to access functionality and retrieve information.

In particular, the first version of the SDK allows the application to query the Unique User ID. See the API header and the provided example for details.


## Structure


```
MuseClientSDK
 │
 ├── README.md
 │   This file, providing an overview about the SDK. 
 │
 ├── bin
 |    |
 |    ├── macos_universal
 |    |   Contains the universal dynamic library for macOS, supporting both arm64 and x86_64 architectures.
 |    |
 │    └── win64
 |        Contains the 64-bit dynamic library (.dll) for Windows, along with the respective import library (.lib).
 |
 ├── include
 |   Header files defining the SDK API for accessing library functions.
 │
 └── example
     A basic cross-platform example demonstrating SDK usage.

```

