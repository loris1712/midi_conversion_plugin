{
  'variables': {
    'use_system_libnanomsg%': 'true',
    'asan': 'false',
  },
  "targets": [
    {
      "target_name": "muse_sdk",
      "sources": [ "muse/muse_sdk.cc" ],
      'dependencies': [
        '<!(node -p \'require("node-addon-api").gyp\')'
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
      'include_dirs': [
        '<!@(node -p \'require("node-addon-api").include\')'
      ]
    },
  ],
}