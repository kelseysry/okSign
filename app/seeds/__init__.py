from flask.cli import AppGroup
from .users import seed_users, undo_users
from .userProfiles import seed_userProfiles, undo_userProfiles
from .genders import seed_genders, undo_genders
from .relationships import seed_relationships, undo_relationships
from .orientations import seed_orientations, undo_orientations
from .horoscopes import seed_horoscopes, undo_horoscopes
from .children import seed_children, undo_children
from .pets import seed_pets, undo_pets
from .politics import seed_politics, undo_politics
from .conversations import seed_conversations, undo_conversations
from .messages import seed_messages, undo_messages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_genders()
    seed_relationships()
    seed_orientations()
    seed_horoscopes()
    seed_children()
    seed_pets()
    seed_politics()
    seed_userProfiles()
    seed_conversations()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_messages()
    undo_conversations
    undo_userProfiles()
    undo_users()
    undo_genders()
    undo_orientations()
    undo_horoscopes()
    undo_relationships()
    undo_children()
    undo_pets()
    undo_politics()
    # Add other undo functions here
