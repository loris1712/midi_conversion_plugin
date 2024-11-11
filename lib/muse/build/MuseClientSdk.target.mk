# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := MuseClientSdk
### Generated for copy rule.
/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/libMuseClientSdk.1.0.2.dylib: TOOLSET := $(TOOLSET)
/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/libMuseClientSdk.1.0.2.dylib: /Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/MuseClientSDK/bin/macos_universal/libMuseClientSdk.1.0.2.dylib FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += /Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/libMuseClientSdk.1.0.2.dylib
binding_gyp_MuseClientSdk_target_copies = /Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/libMuseClientSdk.1.0.2.dylib

DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=MuseClientSdk' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-DELECTRON_ENSURE_CONFIG_GYPI' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DUSING_ELECTRON_CONFIG_GYPI' \
	'-DV8_COMPRESS_POINTERS' \
	'-DV8_COMPRESS_POINTERS_IN_ISOLATE_CAGE' \
	'-DV8_31BIT_SMIS_ON_64BIT_ARCH' \
	'-DV8_ENABLE_SANDBOX' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DOPENSSL_NO_ASM' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-O0 \
	-gdwarf-2 \
	-mmacosx-version-min=10.15 \
	-arch \
	x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter

# Flags passed to only C files.
CFLAGS_C_Debug := \
	-fno-strict-aliasing \
	-arch x86_64 \
	-arch arm64

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-std=gnu++17 \
	-stdlib=libc++ \
	-fno-rtti \
	-fno-exceptions \
	-fno-strict-aliasing \
	-arch x86_64 \
	-arch arm64

# Flags passed to only ObjC files.
CFLAGS_OBJC_Debug :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Debug :=

INCS_Debug := \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/include/node \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/src \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/openssl/config \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/openssl/openssl/include \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/uv/include \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/zlib \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/v8/include \
	-I/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/MuseClientSDK/include

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=MuseClientSdk' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_GLIBCXX_USE_CXX11_ABI=1' \
	'-DELECTRON_ENSURE_CONFIG_GYPI' \
	'-D_DARWIN_USE_64_BIT_INODE=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DUSING_ELECTRON_CONFIG_GYPI' \
	'-DV8_COMPRESS_POINTERS' \
	'-DV8_COMPRESS_POINTERS_IN_ISOLATE_CAGE' \
	'-DV8_31BIT_SMIS_ON_64BIT_ARCH' \
	'-DV8_ENABLE_SANDBOX' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DOPENSSL_THREADS' \
	'-DOPENSSL_NO_ASM' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-O3 \
	-gdwarf-2 \
	-mmacosx-version-min=10.15 \
	-arch \
	x86_64 \
	-Wall \
	-Wendif-labels \
	-W \
	-Wno-unused-parameter

# Flags passed to only C files.
CFLAGS_C_Release := \
	-fno-strict-aliasing \
	-arch x86_64 \
	-arch arm64

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-std=gnu++17 \
	-stdlib=libc++ \
	-fno-rtti \
	-fno-exceptions \
	-fno-strict-aliasing \
	-arch x86_64 \
	-arch arm64

# Flags passed to only ObjC files.
CFLAGS_OBJC_Release :=

# Flags passed to only ObjC++ files.
CFLAGS_OBJCC_Release :=

INCS_Release := \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/include/node \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/src \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/openssl/config \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/openssl/openssl/include \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/uv/include \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/zlib \
	-I/Users/archie/.electron-gyp/Library/Caches/node-gyp/30.0.1/deps/v8/include \
	-I/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/MuseClientSDK/include

OBJS := \
	$(obj).target/$(TARGET)/MuseClientSdk_addon.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# Make sure our actions/rules run before any of us.
$(OBJS): | $(binding_gyp_MuseClientSdk_target_copies)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))
$(OBJS): GYP_OBJCFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE)) $(CFLAGS_OBJC_$(BUILDTYPE))
$(OBJS): GYP_OBJCXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE)) $(CFLAGS_OBJCC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
# Build our special outputs first.
/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/MuseClientSdk.node: | $(binding_gyp_MuseClientSdk_target_copies)

# Preserve order dependency of special output on deps.
$(binding_gyp_MuseClientSdk_target_copies): | 

LDFLAGS_Debug := \
	-Wl,-rpath,@loader_path/ \
	-arch x86_64 \
	-arch arm64 \
	-s \
	-Wl,-S \
	-undefined dynamic_lookup \
	-Wl,-search_paths_first \
	-mmacosx-version-min=10.15 \
	-arch \
	x86_64 \
	-L$(builddir) \
	-stdlib=libc++

LIBTOOLFLAGS_Debug := \
	-Wl,-rpath,@loader_path/ \
	-arch x86_64 \
	-arch arm64 \
	-s \
	-Wl,-S \
	-undefined dynamic_lookup \
	-Wl,-search_paths_first

LDFLAGS_Release := \
	-Wl,-rpath,@loader_path/ \
	-arch x86_64 \
	-arch arm64 \
	-s \
	-Wl,-S \
	-undefined dynamic_lookup \
	-Wl,-search_paths_first \
	-mmacosx-version-min=10.15 \
	-arch \
	x86_64 \
	-L$(builddir) \
	-stdlib=libc++

LIBTOOLFLAGS_Release := \
	-Wl,-rpath,@loader_path/ \
	-arch x86_64 \
	-arch arm64 \
	-s \
	-Wl,-S \
	-undefined dynamic_lookup \
	-Wl,-search_paths_first

LIBS := \
	/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/MuseClientSDK/bin/macos_universal/libMuseClientSdk.1.0.2.dylib

/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/MuseClientSdk.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/MuseClientSdk.node: LIBS := $(LIBS)
/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/MuseClientSdk.node: GYP_LIBTOOLFLAGS := $(LIBTOOLFLAGS_$(BUILDTYPE))
/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/MuseClientSdk.node: TOOLSET := $(TOOLSET)
/Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/MuseClientSdk.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += /Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/MuseClientSdk.node
# Add target alias
.PHONY: MuseClientSdk
MuseClientSdk: $(builddir)/MuseClientSdk.node

# Copy this to the executable output path.
$(builddir)/MuseClientSdk.node: TOOLSET := $(TOOLSET)
$(builddir)/MuseClientSdk.node: /Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/MuseClientSdk.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/MuseClientSdk.node
# Short alias for building this executable.
.PHONY: MuseClientSdk.node
MuseClientSdk.node: /Users/archie/VisualStudioCode/tutorials/halbestunde-plugin/lib/muse/mac/MuseClientSdk.node $(builddir)/MuseClientSdk.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/MuseClientSdk.node

