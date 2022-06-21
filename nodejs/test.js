function test () {
  try {
    return;
  } catch (error) {
    console.log('error');
  } finally {
    console.log('finally')
  }
}

test();