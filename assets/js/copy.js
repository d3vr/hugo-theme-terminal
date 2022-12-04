function createCopyButton(highlightDiv) {
  const button = document.createElement("button");
  button.className = "copy-code-button";
  button.type = "button";
  button.innerText = "Copy";
  button.addEventListener("click", () => copyCodeToClipboard(button, highlightDiv));
  highlightDiv.insertBefore(button, highlightDiv.firstChild);
}

async function copyCodeToClipboard(button, highlightDiv) {
  const code_lines = highlightDiv.querySelectorAll(":last-child > .chroma > code .cl");
  let codeToCopy = "";
  code_lines.forEach(cl => {
    codeToCopy += cl.textContent;
  });

  try {
    let result = await navigator.permissions.query({ name: "clipboard-write" });
    if (result.state == "granted" || result.state == "prompt") {
      console.log("api");
      await navigator.clipboard.writeText(codeToCopy);
    } else {
      console.log("exec");
      copyCodeBlockExecCommand(codeToCopy, highlightDiv);
    }
  } catch (_) {
    console.log("exec");
    copyCodeBlockExecCommand(codeToCopy, highlightDiv);
  } finally {
    console.log("success");
    codeWasCopied(button);
  }
}

function copyCodeBlockExecCommand(codeToCopy, highlightDiv) {
  const textArea = document.createElement("textArea");
  textArea.contentEditable = "true";
  textArea.readOnly = "false";
  textArea.className = "copyable-text-area";
  textArea.value = codeToCopy;
  highlightDiv.insertBefore(textArea, highlightDiv.firstChild);
  const range = document.createRange();
  range.selectNodeContents(textArea);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  textArea.setSelectionRange(0, 999999);
  document.execCommand("copy");
  highlightDiv.removeChild(textArea);
}

function codeWasCopied(button) {
  button.blur();
  button.innerText = "Copied!";
  setTimeout(function() {
    button.innerText = "Copy";
  }, 2000);
}

document.querySelectorAll(".highlight").forEach(highlightDiv => createCopyButton(highlightDiv));
