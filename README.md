# filetree-generator

Ask through a modal for a model and data then generates the associated template.

## Install

Install with [apm](https://github.com/atom/apm)

```
apm install filetree-generator
```

## Settings

`Settings -> Packages -> filetree-generator -> Settings`

### Models Path

Directory where models are.

### Models List

A JSON object where each key is the model identifier and the value is the text shown in the modal.

## Usage

Use the context menu on a directory in the tree view. Select the model and enter the data that will be used during the tree generation. The data can be used to replace tokens inside file names and contents.

The replacement matchs `{{-- case --}}` with/out spaces. `case` is used to convert the data entered previously. It can be `raw` that let the data as is or a short hand method of [change-case](https://www.npmjs.com/package/change-case#usage).

Example with `File Tree Template`:

```
camel:    fileTreeExample
constant: FILE_TREE_EXAMPLE
dot:      file.tree.example
header:   File-Tree-Example
lower:    file tree example
lcFirst:  file Tree Example
no:       file tree example
param:    file-tree-example
pascal:   FileTreeExample
path:     file/tree/example
raw:      File Tree Template
sentence: File tree example
snake:    file_tree_example
swap:     fILE tREE eXAMPLE
title:    File Tree Example
upper:    FILE TREE EXAMPLE
ucFirst:  File Tree Example
```
