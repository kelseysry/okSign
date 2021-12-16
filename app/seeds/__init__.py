from flask.cli import AppGroup
from .users import seed_users, undo_users
from .profiles import seed_profiles, undo_profiles
from .genders import seed_genders, undo_genders
from .partners import seed_partners, undo_partners
from .orientations import seed_orientations, undo_orientations
from .horoscopes import seed_horoscopes, undo_horoscopes
from .children import seed_children, undo_children
from .pets import seed_pets, undo_pets
from .politics import seed_politics, undo_politics
from .conversations import seed_conversations, undo_conversations
from .messages import seed_messages, undo_messages
from .religions import seed_religions, undo_religions
from .questions import seed_questions, undo_questions
from .smokings import seed_smokings, undo_smokings
from .drinkings import seed_drinkings, undo_drinkings

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_genders()
    seed_partners()
    seed_orientations()
    seed_horoscopes()
    seed_children()
    seed_pets()
    seed_smokings()
    seed_drinkings()
    seed_politics()
    seed_religions()
    seed_profiles()
    seed_questions()
    seed_conversations()
    seed_messages()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_messages()
    undo_conversations()
    undo_questions()
    undo_profiles()
    undo_users()
    undo_genders()
    undo_orientations()
    undo_horoscopes()
    undo_partners()
    undo_children()
    undo_pets()
    undo_drinkings()
    undo_smokings()
    undo_politics()
    undo_religions()
