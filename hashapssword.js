import bcrypt from "bcryptjs";

const password = process.argv[2]; // Get the password from the command-line arguments

if (!password) {
  console.error("Please provide a password to hash.");
  process.exit(1);
}

const saltRounds = 10;

bcrypt.genSalt(saltRounds, function (err, salt) {
  if (err) {
    console.error(err);
  } else {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        console.error(err);
      } else {
        console.log("Hashed Password:", hash);
      }
    });
  }
});
