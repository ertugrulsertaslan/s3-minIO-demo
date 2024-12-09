# Node.js Installation Guide

This document explains how to install **Node.js** on **macOS**, **Windows**, and **Linux**.

---

## macOS Installation of Node.js

To install **Node.js** on macOS, follow these steps:

### 1. Install via Homebrew

**Homebrew** is a popular package manager for macOS. If you don't have Homebrew installed, first install it by running the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once Homebrew is installed, you can install Node.js and npm (Node Package Manager) using the following command:

```bash
brew install node
```

## Windows Installation of Node.js

To install **Node.js** on Windows, follow these steps:

### 1. Download Node.js

- Go to the [Node.js Download Page](https://nodejs.org/).

## Linux Installation of Node.js

On Linux, the installation steps vary depending on the distribution you are using. Below are the steps for **Ubuntu/Debian** based and **CentOS/RHEL** based systems.

### 1. Ubuntu/Debian Installation

To install **Node.js** on **Ubuntu** or **Debian** based systems, follow these steps:

#### 1.1 Add Node.js Repositories

To install the latest LTS version of **Node.js**, add the NodeSource repository:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
```

### 1.2 Install Node.js

After adding the repository, run the following command to install Node.js:

```bash
sudo apt install -y nodejs
```

### 2. CentOS/RHEL Installation

To install Node.js on CentOS or RHEL based systems, follow these steps:

### 2.1 Add Node.js Repositories

To install the latest LTS version of Node.js, add the NodeSource repository:

```bash
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
```

### 2.2 Install Node.js

After adding the repository, run the following command to install Node.js:

```bash
sudo yum install -y nodejs
```
