Easily secure Meteor with free, automatically issued SSL certificates from [Let's Encrypt](https://letsencrypt.org/).
Now it's free and easy to securely serve your Meteor app/site over https without needing Galaxy or Meteor Up.
# Installation
````shell
$ meteor add noland:lets-encrypt
````
# Motivation
Without some help, Meteor does not play nice with the Let's Encrypt [Certbot](https://certbot.eff.org/). This is because Meteor manages the `public` directory and the `certbot` CLI cannot write ACME challenges to that directory and have it immediately readable by the challenge issuer. Thus it fails to prove domain name control.  You can work around this by using the manual cert issuing workflow, copy and paste filenames and contents, and rebuild your Meteor app.

But that sucks. So this package allows you to use the automatic `webroot` option to issue certs.
# How it works
# Security warning
**TL;DR** Don't put private files in the `letsEncryptChallengesDir` directory.

In theory, this packages introduces a somewhat obscure security risk because
it serves files from outside the Meteor project root folder which is generally unexpected.
The files it serves though are tightly controlled and their names are strictly sanitized with a whitelist of characters.

Any file immediately in the directory named in your Meteor settings under the key `letsEncryptChallengesDir` or `private.letsEncryptChallengesDir`
will be served to the public. No deeper/nested files or parent folders will be served.
# Next steps
