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
	docker-compose up -d --build quasar && echo docker app started && failed=0
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
	rm -rf ./src/* && rm -f ./src/.* && docker-compose run --rm npm yarn create quasar
	echo "Project created"
}

# ./commands.sh run setup
function setupProject(){
	docker-compose run --rm npm npm install
	echo "docker app setup"
}

# Main
case $1 in
	# start
	start)
		startProject
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
				setupProject
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

