one change1
circleci/config.yml

## GENERATE KEYSTORE

keytool -genkeypair -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias