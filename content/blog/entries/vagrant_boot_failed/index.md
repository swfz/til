---
title: "VagrantのVMが立ち上がらなくなってしまったときの対処方いくつか"
date: "2021-01-26"
description: "最終的にはWindows再起動"
tags:
  - Vagrant
  - VirtualBox
---

ホスト機がフリーズしてしまったとかVMを正常に終了させられないまま再起動してしまったときなど

ごくたまにVagrantで使っているVMが起動しなくなる

いくつか試してみたのでその記録

本記事では`dev4`というVM名で進める

```shell
$ vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Checking if box 'bento/centos-7.4' version '201803.24.0' is up to date...
==> default: Clearing any previously set forwarded ports...
There was an error while executing `VBoxManage`, a CLI used by Vagrant
for controlling VirtualBox. The command and stderr is shown below.

Command: ["modifyvm", "d4c26ea5-e507-4049-878a-2c89a841f9e6", "--natpf1", "delete", "127.0.0.1tcp22396", "--natpf1", "delete", "127.0.0.1tcp9200", "--natpf1", "delete", "127.0.0.1tcp9300", "--natpf1", "delete", "ssh"]

Stderr: VBoxManage.exe: error: The machine 'dev4' is already locked for a session (or being unlocked)
VBoxManage.exe: error: Details: code VBOX_E_INVALID_OBJECT_STATE (0x80bb0007), component MachineWrap, interface IMachine, callee IUnknown
VBoxManage.exe: error: Context: "LockMachine(a->session, LockType_Write)" at line 554 of file VBoxManageModifyVM.cpp
```

lockされてます

いくつか調べたら`poweroff`にすればよいとあったので実行してみる

```shell
$ cd /c/Program\ Files/Oracle/VirtualBox
$ ./VBoxManage.exe controlvm dev4 poweroff
VBoxManage.exe: error: The virtual machine is being powered down
VBoxManage.exe: error: Details: code VBOX_E_INVALID_VM_STATE (0x80bb0002), component ConsoleWrap, interface IConsole, callee IUnknown
VBoxManage.exe: error: Context: "PowerDown(progress.asOutParam())" at line 619 of file VBoxManageControlVM.cpp
```

もう止まっているよということのよう

```
$ vagrant status
Current machine states:

default                   stopping (virtualbox)

The VM is stopping.
```

- 参考

[VirtualBoxで仮想コンピュータが反応しなくなった時( = _ = )](https://qiita.com/Ikumi/items/557808a232a0c12d3027)

を参考に強制的に落とす

```shell
 ./VBoxManage.exe startvm dev4 --type emergencystop
```

abortedになった

```shell
$ vagrant status
Current machine states:

default                   aborted (virtualbox)

The VM is in an aborted state. This means that it was abruptly
stopped without properly closing the session. Run `vagrant up`
to resume this virtual machine. If any problems persist, you may
have to destroy and restart the virtual machine.
```

ここから`vagrant up`して無事立ち上げることができた


```
$ vagrant up
.....
.....
.....
Timed out while waiting for the machine to boot. This means that
Vagrant was unable to communicate with the guest machine within
the configured ("config.vm.boot_timeout" value) time period.

If you look above, you should be able to see the error(s) that
Vagrant had when attempting to connect to the machine. These errors
are usually good hints as to what may be wrong.

If you're using a custom box, make sure that networking is properly
working and you're able to connect to the machine. It is a common
problem that networking isn't setup properly in these boxes.
Verify that authentication configurations are also setup properly,
as well.

If the box appears to be booting properly, you may want to increase
the timeout ("config.vm.boot_timeout") value.
```

が、立ち上がったは良いがsshできないという感じになってしまった

VirtualBoxからものぞいてみようと試みたがVMが完全に立ち上がらない状態で操作できず

結局ホストのWindowsを完全シャットダウン（shift+シャットダウン）&起動してVM起動したら動くようになっていた

ただの徒労…
