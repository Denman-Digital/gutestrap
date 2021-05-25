<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitcd6c2622ebc1de81472d93bb101f14e6
{
    public static $files = array (
        'c257f8e6c6fd01559b7437f250cb4044' => __DIR__ . '/..' . '/denman-digital/wp-utils/utils.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'ScssPhp\\ScssPhp\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'ScssPhp\\ScssPhp\\' => 
        array (
            0 => __DIR__ . '/..' . '/scssphp/scssphp/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitcd6c2622ebc1de81472d93bb101f14e6::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitcd6c2622ebc1de81472d93bb101f14e6::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitcd6c2622ebc1de81472d93bb101f14e6::$classMap;

        }, null, ClassLoader::class);
    }
}
