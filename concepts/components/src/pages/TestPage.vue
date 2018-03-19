<template>
  <div class="page">
    
    <label>Text</label>
    <input type="text">

    <label>Text with placeholder</label>
    <input type="text" placeholder="Text">

    <label>Passwort</label>
    <input type="password">

    <label>Button</label>
    <button>Test</button>

    <label>Textarea</label>
    <textarea></textarea>

    <label>Select</label>
    <select>
      <option></option>
      <option>Option A</option>
      <option>Option B</option>
    </select>

    <label>Checkbox</label>
    <input type="checkbox">

    <label>Radiobutton</label>
    <input type="radio">
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  }
}

</script>

<style>
label {
  margin-top: 20px;
  margin-bottom: 5px;
}
</style>
