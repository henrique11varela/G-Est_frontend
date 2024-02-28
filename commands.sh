# Use this file as a command.
# 
# start
#	- starts the containers
#
# stop
#	- stops the containers
#
# run <command>
#	- runs <command> on the designated containers
#	options:
#		- new - builds new project
#		- setup - sets up project
#

# confirm <command> <question> <message if canceled>
function confirm(){
	read -p "$2" confirm
	if [ "$confirm" = 'y' ] || [ "$confirm" = 'Y' ]
	then
		$1
	else
		echo "$3"
	fi
}

# ./commands.sh start
function startProject(){
	failed=1
	docker-compose up -d --build quasar && echo "docker app started" && echo "Ctrl + Click: http://localhost:80" && failed=0
	if [ $failed -eq 1 ]
	then
		echo "docker app failed to start"
	fi
}

# ./commands.sh stop
function stopProject(){
	failed=1
	docker-compose down && echo docker app stopped && failed=0
	if [ $failed -eq 1 ]
	then
		echo "docker app failed to stop"
	fi
}

# ./commands.sh run new
function createNewProject(){
	rm -rf ./src/* && rm -f ./src/.* && docker-compose run --rm npmfrontend yarn create quasar
	echo "Project created"
}

# ./commands.sh run setup
function setupProject(){
	docker-compose run --rm npmfrontend npm install
	echo "docker app setup"
}

function envDevFill(){
    cp ./src/.env.example ./src/.env
	echo ".env file updated for development"
}

# Main
case $1 in
	# start
	start)
		startProject
		;;
	# start
	start-local)
		cd src && \
		npm run dev && \
		cd ..
		;;
	# stop
	stop)
		stopProject
		;;
	# run
	run)
		case $2 in
			new)
				confirm "createNewProject" "Confirm (y/N): " "Action canceled"
				;;
			# run setup
			setup)
				envDevFill
				setupProject
				;;
			setup-local)
				cd src && \
				rm -rf ./.env && \
				cp ./.env.dockerless ./.env && \
				cp ./quasar.config.js.dockerless ./quasar.config.js && \
				npm install && \
				cd .. && \
				echo "local app setup"
				;;
			# run ____
			*)
				if [ -z $2 ]
				then
					echo "No arguments where provided after \"$1\"."
				else
					echo "unknown command"
				fi
				;;
		esac
		;;
	# ____
	*)
		if [ -z $1 ]
		then
			echo "No arguments where provided."
		else
			echo "unknown command"
		fi
		;;
esac

