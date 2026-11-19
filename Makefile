
SRC_DIR = src
TEST_DIR = test
DIST_SRC_DIR = dist/src
DIST_TEST_DIR = dist/test



test: 
	/usr/bin/npx jest $(TEST_DIR)

build :
	rm -rf dist/test/* dist/src/*
	/usr/bin/npx tsc -p tsconfig.json

eslint : 
	/usr/bin/npx eslint src $(TEST_DIR)

runSrcJs : 
	for file in $(DIST_SRC_DIR)/*.js; do \
		npx tsx $$file; \
	done

runTestJs :
	for file in $(TEST_DIR)/*; do \
		npx jest $$file; \
	done

function :
	node $(DIST_SRC_DIR)/function.js

instructions: 
	node $(DIST_SRC_DIR)/instructions.js

goal :
	node $(DIST_SRC_DIR)/goal.js

puzzle : 
	node $(DIST_SRC_DIR)/puzzle.js

solve :
	node $(DIST_SRC_DIR)/solve.js

world :
	node $(DIST_SRC_DIR)/world.js

serve:
	npx parcel serve src/index.html

rapport:
	cd rapport && pdflatex rapport.tex
	cd rapport && pdflatex rapport.tex && evince rapport.pdf

clean :
	rm -rf $(DIST_SRC_DIR)/* $(DIST_TEST_DIR)/* rapport/*.log rapport/*.aux rapport/*.toc rapport/*.out rapport/*.pdf

.PHONY: runSrcJs runTestJs genJs build test rapport
