.PHONY: all pack build clean test doc run stddev profile install-deps help
.DEFAULT_GOAL := all

# Plan packing variables
TEAM_FILENAME = xpasyn00_xmaroc00_xperni23

# Yarn generated output variables
DOCS_FOLDER=../docs
YARN_STDDEV_OUTPUT=../$(STDDEV_CLI_APP)

# Clean files and folders
BUILT_FOLDERS=../dist ../out ../docs ../build ../node_modules temp
BUILT_FILES=stddev src/$(TEAM_FILENAME).zip

REPO=pasynkovnikita/IVS-calculator
INSTALLER=ivs-calculator_0.1.0_amd64.deb

# Task targets
all: install-deps stddev

pack: clean install-deps doc stddev
	# Create temp folder for the archive
	@mkdir -p temp
	@mkdir -p temp/doc temp/install temp/repo

	# Download installer from the release
	@curl -L --output temp/install/$(INSTALLER) https://github.com/$(REPO)/releases/download/v0.1.0/$(INSTALLER)
	@cp ../stddev temp/install
	@cp -r ../docs temp/doc
	@cd ../ && rm -rf $(BUILT_FOLDERS) stddev
	@rsync -a --exclude 'temp' --exclude 'prebuilt' --exclude 'docs' --exclude '*.zip' --exclude 'node_modules' --exclude 'dist' --exclude 'out' --exclude 'build' --exclude '.idea' --exclude "stddev" ../ temp/repo/

	@cd temp && zip -r $(TEAM_FILENAME).zip doc/ install/ repo/
	@mv temp/$(TEAM_FILENAME).zip ./
	@rm -rf temp

build:
	@echo "Building application"
	@cd .. && yarn build
	@echo "Application built"

clean:
	@echo "Cleaning application files and folders"
	@rm -rf $(BUILT_FOLDERS) $(BUILT_FILES)
	@echo "Application files and folders cleaned"

test:
	@cd .. & yarn test

doc:
	@echo "Generating documentation"
	@cd .. && yarn doc 1> /dev/null
	@echo "Documentation generated"

run:
	@echo "Running application"
	@cd .. && yarn electron:start
	@echo "Application closed"

stddev:
	@echo "Building an stddev executable."
	yarn std:build
	@echo "Built an stddev executable. Pass an input file with numbers: stddev < input.txt"

profile:
	@echo "Profiling: there is a 5 second delay before the script starts for debugger to launch"
	cd .. && yarn profile
	@echo "Finished profiling"

install-deps:
	@command -v node >/dev/null 2>&1 || \
	( \
	  echo "Installing Node.js via nvm..."; \
	  if command -v curl >/dev/null 2>&1; then \
	    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash; \
	  elif command -v wget >/dev/null 2>&1; then \
	    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash; \
	  else \
	    echo "Please install curl or wget to proceed."; \
	    exit 1; \
	  fi; \
	  export NVM_DIR="$$HOME/.nvm"; \
	  . "$$NVM_DIR/nvm.sh"; \
	  nvm install node; \
	)

	@command -v corepack >/dev/null 2>&1 || \
    	( \
    	  echo "Installing Corepack..."; \
    	  npm install -g corepack; \
    	)

	@command -v yarn >/dev/null 2>&1 || \
	( \
	  echo "Installing Yarn..."; \
	  corepack enable && corepack prepare yarn@stable --activate; \
	)

	@command -v bun >/dev/null 2>&1 || \
	( \
	  echo "Installing Bun..."; \
	  if command -v curl >/dev/null 2>&1; then \
	    curl -fsSL https://bun.sh/install | bash; \
	  elif command -v wget >/dev/null 2>&1; then \
	    wget -qO- https://bun.sh/install | bash; \
	  else \
	    echo "Please install curl or wget to proceed."; \
	    exit 1; \
	  fi; \
	)
	@command yarn install

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  all             install dependencies and build an stddev executable"
	@echo "  build           Compile React app"
	@echo "  stddev          Compile stddev"
	@echo "  run             Run the packaged Electron app in dev mode"
	@echo "  test            Run tests"
	@echo "  profile		 Run profiler on 1000000 numbers"
	@echo "  doc             Generate documentation using TypeDoc"
	@echo "  clean           Remove generated files and folders"
	@echo "  pack            Package the entire project for submission"
	@echo "  install-deps    Install required tools and dependencies (Bun, Yarn packages)"
