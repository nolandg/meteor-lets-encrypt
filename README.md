Easily secure Meteor with free, automatically issued SSL certificates from [Let's Encrypt](https://letsencrypt.org/).
Now it's free and easy to securely serve your Meteor app/site over https without needing Galaxy or Meteor Up.

# Motivation
Without some help, Meteor does not play nice with the Let's Encrypt [Certbot](https://certbot.eff.org/). This is because Meteor manages the `public` directory and the `certbot` CLI cannot write ACME challenges to that directory and have it immediately readable by the challenge issuer. Thus it fails to prove domain name control.  You can work around this by using the manual cert issuing workflow, copy and paste filenames and contents, and rebuild your Meteor app.

But that sucks. So with this package you can simply run `letsencrypt certonly --webroot` and it just works.

# Installation
## Add Package
Add the package to your Meteor project:
````shell
$ meteor add noland:lets-encrypt
````
## Install Certbot
Follow the [Let's Encrypt Certbot installation instructions](https://certbot.eff.org/docs/install.html).

## Update your settings file
This package requires a settings file to specify where to find the challenge files the `certbot` creates.
If you're not already using one, read about [how to create and use a settings file](https://themeteorchef.com/snippets/making-use-of-settings-json/).

Either of these keys will work, your preference:
````json
{
  "letsEncryptChallengesDir": "/etc/letsencrypt/challenges/",
  "private": {
    "letsEncryptChallengesDir": "/etc/letsencrypt/challenges/",
  }
}
````
The path must match the `--webroot` path you give to the Certbot.

Don't forget to actually use your settings file.

# Usage
The package automatically responds to challenges from the Let's Encrypt validation server using challenge responses saved in the directory you specified above. You don't need to do anything more on the Meteor end of things.

## Certbot usage
To issue or renew an SSL certificate, use the Let's Encrypt `cerbot`.
Specifically, you'll need the `certonly --webroot` options. See the [Certbot webroot documenation](https://certbot.eff.org/docs/using.html#webroot).

A typical command might look like.
````shell
sudo letsencrypt certonly \
        --webroot --webroot-path /etc/letsencrypt/challenges/ \ # this needs to be the same path as in your settings file
        --cert-path /etc/letsencrypt/live/mydomain.ca \ # this is where your new certs and key are stored
        --domain mydomain.ca \ # all the domains (and subdomains) you want to secure
        --domain subdomain.mydomain.ca
````
Try it without `sudo` to get instructions on how to do that if that's your thing. You can also just run:
````shell
letsencrypt certonly --webroot
````
to use a GUI if you like pointy clicky.

## Restart your server
Whatever you're using to serve your Meteor app might need to be restarted to use the new cert and key.
I use [PM2](http://pm2.keymetrics.io/) and [Redbird Reverse Proxy](https://github.com/OptimalBits/redbird) in production and this combo rocks.
I serve multiple secured domains from the same VPS and same IP address using [SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)
with a Redbird config like so:
````js
webProxy.register('mydomain.ca', 'http://localhost:7010', { // my Meteor is configured to listen on 7010
  ssl: {
    key: '/etc/letsencrypt/live/mydomain.ca/privkey.pem',
    cert: '/etc/letsencrypt/live/mydomain.ca/fullchain.pem',
    ca: '/etc/letsencrypt/live/mydomain.ca/fullchain.pem',
  }
});
````
So to tell Redbird to use the new cert and key, I run:
````sh
sudo pm2 restart redbird-reverse-proxy
````

# Security warning
**TL;DR** Don't put private files in the `letsEncryptChallengesDir` directory.

In theory, this packages introduces a somewhat obscure security risk because
it serves files from outside the Meteor project root folder which is generally unexpected.
The files it serves though are tightly controlled and their names are strictly sanitized with a whitelist of characters.

Any file immediately in the directory named in your Meteor settings under the key `letsEncryptChallengesDir` or `private.letsEncryptChallengesDir`
will be served to the public. No deeper/nested files or parent folders will be served.

# Next steps
Let's Encrypt certs are only issued for 3 months. It would be fairly easy to completely automate the renewal process
by making a cron job to check expiry date and re-running the above commands every 3 months.

PRs and co-maintainer welcome.
