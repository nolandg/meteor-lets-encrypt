Easily secure Meteor with free, automatically issued SSL certificates from [Let's Encrypt](https://letsencrypt.org/).
Now it's free and easy to securely serve your Meteor app/site over https without needing Galaxy or Meteor Up.
# Installation
# Motivation
Without some help, Meteor does not play nice with the Let's Encrypt [Certbot](https://certbot.eff.org/). This is because Meteor manages the `public` directory and the `certbot` CLI cannot write ACME challenges to that directory and have it immediately readable by the challenge issuer. Thus it fails to prove domain name control.  You can work around this by using the manual cert issuing workflow, copy and paste filenames and contents, and rebuild your Meteor app.

But that sucks. So this package allows you to use the automatic `webroot` option to issue certs.
# How it works
# Security warning
# Next steps
