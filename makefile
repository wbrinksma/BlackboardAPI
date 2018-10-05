debug: build-all debug-current

debug-current:
	-@mkdir debug
	-@mkdir debug/js
	-@rm debug/js/client.js
	-@rm debug/js/server.js

	@cp build/packages/client.js debug/js/client.js
	@cp build/packages/server.js debug/js/server.js

	@pushd debug/; python -m SimpleHTTPServer; popd



build-all: build-api build-middleware build-common build-backend package-all
	@echo "Done building all packages!"

package-all: clean-packages package-client package-server
	@echo "Done packaging client and server!"

clean-packages:
	-@rm -rf build/packages
	@mkdir build/packages

package-client:
	@cat build/common/common.js >> build/packages/client.js
	@cat build/backend/backend.js >> build/packages/client.js
	@cat build/api/api.js >> build/packages/client.js

package-server:
	@cat build/common/common.js >> build/packages/server.js
	@cat build/backend/backend.js >> build/packages/server.js
	@cat build/middleware/middleware.js >> build/packages/server.js



build-api: compile-api package-api
	@echo "Done building API!"

compile-api: clean-api-build
	@echo "Compiling Typescript sources for API..."
	@npm run compile-api

package-api:
	@echo "Packaging API..."
	@find build/api/api/* -name "*.js" -type f -exec cat {} \; > build/api/api.js

clean-api-build:
	@echo "Cleaning API build directory..."
	-@rm -rf build/api/*



build-middleware: compile-middleware package-middleware
	@echo "Done building Middleware!"

compile-middleware: clean-middleware-build
	@echo "Compiling Typescript sources for Middleware..."
	@npm run compile-middleware

package-middleware:
	@echo "Packaging Middleware..."
	@find build/middleware/middleware/* -name "*.js" -type f -exec cat {} \; > build/middleware/middleware.js

clean-middleware-build:
	@echo "Cleaning Middleware build directory..."
	-@rm -rf build/middleware/*



build-common: compile-common package-common
	@echo "Done building Common!"

compile-common: clean-common-build
	@echo "Compiling Typescript sources for Common..."
	@npm run compile-common

package-common:
	@echo "Packaging Common..."
	@find build/common/common/* -name "*.js" -type f -exec cat {} \; > build/common/common.js

clean-common-build:
	@echo "Cleaning Common build directory..."
	-@rm -rf build/common/*



build-backend: compile-backend package-backend
	@echo "Done building Backend!"

compile-backend: clean-backend-build
	@echo "Compiling Typescript sources for Backend..."
	@npm run compile-backend

package-backend:
	@echo "Packaging Backend..."
	@find build/backend/backend/* -name "*.js" -type f -exec cat {} \; > build/backend/backend.js

clean-backend-build:
	@echo "Cleaning Backend build directory..."
	-@rm -rf build/backend/*