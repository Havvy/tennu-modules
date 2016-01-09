const System = require('./plugins.js');
const Loader = require('./loader.js');
const errors = require('./errors.js');
const fs = require('fs');

const TennuModules = function (systemname, context) {
    const system = System(context);
    const loader = Loader(system, fs, require, systemname);

    return {
        use: loader.use,
        initialize: system.initialize,
        isInitializable: system.isInitializable,
        hasRole: system.hasRole,
        hasPlugin: system.hasPlugin,
        getPlugin: system.pluginExportsOf,
        getRole: system.roleExportsOf,
        addHook: system.addInitializationHook,
        addInstanceHook: system.addInstanceHook,
        addStaticHook: system.addStaticHook
    };
};

[
    'UnmetDependency',
    'NoSuchPlugin',
    'NoSuchRole',
    'CyclicicDependency',
    'PluginInitializationError',
    'RegistryKeyAlreadySet',
    'HookAlreadyExists',
    'RoleAlreadyExists',
    'PluginAlreadyExists'
].forEach(function (error) {
    TennuModules[error] = errors[error];
});

module.exports = TennuModules;